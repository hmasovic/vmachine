import { body, query, ValidationChain } from 'express-validator';

const PRODUCT_MIN_PRICE = 0.05; // 5 cents
const PRODUCT_NAME_MIN_LENGTH = 2;
const PRODUCT_AMOUNT_MIN_VALUE = 1;

/**
 * Helper function used for checking if the cost is in multiples of 5.
 *
 * @param  {number} cost - The cost price
 * @returns boolean - A boolean indicating if the cost is in multiples of 5 or not
 */
const checkIfCostIsInMultiples = (cost: number): boolean => {
  const cents = cost * 100;
  return cents % 5 === 0;
};

const DEFAULT_PRODUCT_VALIDATORS = [
  body('cost', 'cost is undefined or not a valid number!').isFloat({ min: PRODUCT_MIN_PRICE }).custom(checkIfCostIsInMultiples).withMessage('Cost should be in multiples of 5').toFloat(),
  body('productName', 'productName is undefined or not a valid string!').isString().isLength({ min: PRODUCT_NAME_MIN_LENGTH }),
  body('amountAvailable', 'amountAvailable is undefined or not a valid number!').isInt({ min: PRODUCT_AMOUNT_MIN_VALUE }).toInt(),
];

export const getProduct: ValidationChain[] = [query('productId', 'productId is undefined or not a valid string!').isString().toInt()];

export const createProduct: ValidationChain[] = [...DEFAULT_PRODUCT_VALIDATORS];

export const updateProduct: ValidationChain[] = [...DEFAULT_PRODUCT_VALIDATORS];

export const deleteProduct: ValidationChain[] = [query('productId', 'productId is undefined or not a valid string!').isString().toInt()];
