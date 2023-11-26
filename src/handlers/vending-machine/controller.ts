import { logger } from '@logs/index';

import { buildMessageResponse } from '@lib/helpers';
import { VendingMachineService } from '@services/index';

import { BuyProductResponseDto } from '@schemes/interfaces';
import { BuyProductRequest, BuyProductResponse, DepositCoinRequest, DepositCoinResponse, ResetDepositedCoinsRequest, ResetDepositedCoinsResponse } from '@schemes/vending-machine';

import { HTTP_STATUSES } from '@lib/constants';
import { NotEnoughDeposit, NotEnoughProducts } from '@lib/exceptions';

/**
 * Handler function used for depositing a new coin.
 *
 * @param  {DepositCoinRequest} req - Request defined in the schemes
 * @param  {DepositCoinResponse} res - Response defined in the schemes
 */
export const depositCoin = async (req: DepositCoinRequest, res: DepositCoinResponse) => {
  try {
    const userId = req.locals?.user.id;
    const coin = req.body.coin;

    const totalDeposited = await VendingMachineService.depositCoin(userId, coin);

    return res.status(HTTP_STATUSES.CREATED).send({ totalDeposited });
  } catch (error) {
    logger.error(`[handlers/vending-machine/depositCoint] - ${error.message}`);
    return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).send(buildMessageResponse('An error occured, please contact support!'));
  }
};

/**
 * Handler function used for buying a specific product.
 *
 * @param  {ResetDepositedCoinsRequest} req - Request defined in the schemes
 * @param  {ResetDepositedCoinsResponse} res - Response defined in the schemes
 */
export const buyProduct = async (req: BuyProductRequest, res: BuyProductResponse) => {
  try {
    const userId = req.locals?.user.id;
    const productId = req.body.productId;
    const amount = req.body.amount;

    const transactionMetadata = await VendingMachineService.buyProduct(userId, productId, amount);

    return res.status(HTTP_STATUSES.OK).send(transactionMetadata);
  } catch (e) {
    logger.error(`[handlers/vending-machine/buyProduct] - ${e.message}`);

    const isTransactionError = e instanceof NotEnoughDeposit || e instanceof NotEnoughProducts;

    const message = isTransactionError ? e.message : 'An error occured, please contact support!';
    const status = isTransactionError ? HTTP_STATUSES.UNPROCESSABLE_ENTITY : HTTP_STATUSES.INTERNAL_SERVER_ERROR;

    return res.status(status).send(buildMessageResponse(message));
  }
};

/**
 * Handler function used for resetting the user's balance for deposited coins.
 *
 * @param  {ResetDepositedCoinsRequest} req - Request defined in the schemes
 * @param  {ResetDepositedCoinsResponse} res - Response defined in the schemes
 */
export const resetDepositedCoins = async (req: ResetDepositedCoinsRequest, res: ResetDepositedCoinsResponse) => {
  try {
    const userId = req.locals?.user.id;

    const totalDeposited = await VendingMachineService.resetUserDeposit(userId);

    return res.status(HTTP_STATUSES.OK).send({ totalDeposited });
  } catch (error) {
    logger.error(`[handlers/vending-machine/resetDepositedCoins] - ${error.message}`);
    return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).send(buildMessageResponse('An error occured, please contact support!'));
  }
};
