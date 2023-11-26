import { VendingMachineRepository } from '@repositories/index';

import { BuyProductTransactionMetadata } from './interfaces';

import { VENDING_MACHINE_COINS, VENDING_MACHINE_COINS_REPRESENTATION } from '@lib/constants';

/**
 * Helper function used to get the change in coins for the predefined `VENDING_MACHINE_COINS` coins.
 * Since the coins are a canonical set, the greedy algorithm will provide the optimal solution / fastest time.
 * If the pre-defined coins were to change to a non-canonical set, dynamic programming would be the optimal solution
 * because this would be a knapsack problem (or the coin change problem as an integer variation of the knapsack problem).
 *
 * Reference links:
 * - https://stackoverflow.com/a/48811603
 * - https://bytethisstore.com/articles/pg/knapsack-problem
 *
 * @param  {number} change - The change amount in cents
 * @returns number - The array defining how many coins of each amount should be returned
 */
const getCoinsForChange = (change: number): number[] => {
  const coins = VENDING_MACHINE_COINS;
  const coinsLength = coins.length;

  // coins representing the amount for the array [5, 10, 20, 50, 100]
  const changeCoins = [0, 0, 0, 0, 0];

  for (let i = 0; i < coinsLength; ++i) {
    const coin = coins[i];
    const amount = Math.floor(change / coin);
    changeCoins[coinsLength - i - 1] = amount;
    change -= amount * coin;
  }

  return changeCoins;
};

/**
 * Service function used for depositing a coin towards the user's balance.
 *
 * @param  {number} userId - The user id
 * @param  {number} coin - The coin deposited
 * @returns Promise - Result delegated back as the total amount deposited
 */
export const depositCoin = async (userId: number, coin: number): Promise<number> => {
  const amountInCents = coin / 100;
  return await VendingMachineRepository.depositMoney(userId, amountInCents);
};

/**
 * Service function used for buying a specific product with the amount specified.
 *
 * @param  {number} userId - The user id
 * @param  {number} productId - The product id
 * @param  {number} amount - The amount of the product required
 * @returns Promise - Result delegated back as {@link BuyProductTransactionMetadata}
 */
export const buyProduct = async (userId: number, productId: number, amount: number): Promise<BuyProductTransactionMetadata> => {
  const depositTransaction = await VendingMachineRepository.buyAndUpdateUsersDeposit(userId, productId, amount);
  const changeAmount = depositTransaction.change;
  const changeAmountInCents = changeAmount * 100;

  const changeInCoins = getCoinsForChange(changeAmountInCents);

  return {
    changeAmount,
    changeInCoins,
    changeRepresentationInCoins: VENDING_MACHINE_COINS_REPRESENTATION,
    totalSpent: depositTransaction.totalCost,
    product: { productName: depositTransaction.product.productName, cost: depositTransaction.product.cost },
  };
};

/**
 * Service function used for resetting the user's deposit balance.
 *
 * @param  {number} userId - The user id
 * @returns Promise - Result delegated back as the total amount deposited
 */
export const resetUserDeposit = async (userId: number): Promise<number> => {
  return await VendingMachineRepository.resetUserDepositBalance(userId);
};
