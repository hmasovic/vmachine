import { body, ValidationChain } from 'express-validator';

import { VENDING_MACHINE_COINS } from '@lib/constants';

const BUY_PRODUCT_AMOUNT_MIN_VALUE = 1;

export const depositCoin: ValidationChain[] = [
  body('coin', 'coin is undefined or not a valid string!').isIn(VENDING_MACHINE_COINS).withMessage('coin is not one of the required cent values!').toInt(),
];

export const buyProduct: ValidationChain[] = [
  body('productId', 'productId is undefined or not a valid number!').isInt().toInt(),
  body('amount', 'amount is undefined or not a valid number!').isInt({ min: BUY_PRODUCT_AMOUNT_MIN_VALUE }).toInt(),
];

export const resetDepositedCoins: ValidationChain[] = [];
