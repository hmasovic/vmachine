import { Transaction } from 'sequelize';

import db from '@lib/db';

import { Products, Users } from '@lib/db/models';
import { DepositTransaction } from './interfaces';

import { EntityNotFound, EntityNotUpdated, NotEnoughDeposit, NotEnoughProducts } from '@lib/exceptions';

/**
 * Repository function used for depositing money towards the user's deposit balance.
 *
 * @param  {number} userId - The user id
 * @param  {number} amount - The amount to deposit
 * @returns Promise - Result delegated back as the total amount of deposits
 */
export const depositMoney = async (userId: number, amount: number): Promise<number> => {
  const transaction = await db.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ });

  try {
    const user = await Users.findOne({ where: { id: userId }, transaction });
    const totalDeposited = user.deposit + amount;

    await Users.update({ deposit: totalDeposited }, { where: { id: userId }, transaction });
    await transaction.commit();

    return totalDeposited;
  } catch (e) {
    await transaction.rollback();
    throw e;
  }
};

/**
 * Repository function used for buying a specific amount of products and updating the user's deposit with the product state.
 *
 * @param  {number} userId - The user id
 * @param  {number} productId - The product id
 * @param  {number} amount - The amount of products to be bought
 * @returns Promise - Result delegated back as {@link DepositTransaction}
 */
export const buyAndUpdateUsersDeposit = async (userId: number, productId: number, amount: number): Promise<DepositTransaction> => {
  const transaction = await db.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ });

  try {
    const [user, product] = await Promise.all([Users.findOne({ where: { id: userId }, transaction }), Products.findOne({ where: { id: productId }, transaction })]);

    if (!product) {
      throw new EntityNotFound(`Product with the id: ${productId} was not found!`);
    }

    const userDeposit = user.deposit;

    if (product.amountAvailable < amount) {
      throw new NotEnoughProducts('Not enough products available to perform the transaction!');
    }

    const totalProductCost = product.cost * amount;

    if (userDeposit < totalProductCost) {
      throw new NotEnoughDeposit('Not enough deposit available to perform the transaction!');
    }

    const change = userDeposit - totalProductCost;
    const productsLeft = product.amountAvailable - amount;

    await Promise.all([Users.update({ deposit: 0 }, { where: { id: userId }, transaction }), Products.update({ amountAvailable: productsLeft }, { where: { id: productId }, transaction })]);
    await transaction.commit();

    return { totalCost: totalProductCost, change, product };
  } catch (e) {
    await transaction.rollback();
    throw e;
  }
};

/**
 * Repository function used for resetting the user's deposit balance.
 *
 * @param  {number} userId - The user id
 * @returns Promise - Result delegated back as the reset amount
 */
export const resetUserDepositBalance = async (userId: number): Promise<number> => {
  const [rowsAffected, users] = await Users.update({ deposit: 0 }, { where: { id: userId }, returning: true });

  if (rowsAffected === 0) {
    throw new EntityNotUpdated(`The user id: ${userId} deposit balance wasn't updated!`);
  }

  return users?.[0].deposit;
};
