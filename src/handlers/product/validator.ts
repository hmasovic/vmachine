import { body, query, ValidationChain } from 'express-validator';

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

export const getProduct: ValidationChain[] = [query('productId', 'productId is undefined or not a valid string!').isString().toInt()];

export const createProduct: ValidationChain[] = [
  body('cost', 'cost is undefined or not a valid number!').isNumeric().isLength({ min: 0 }).custom(checkIfCostIsInMultiples).withMessage('Cost should sbe in multiples of 5'),
  body('productName', 'productName is undefined or not a valid string!').isString(),
  body('amountAvailable', 'amountAvailable is undefined or not a valid number!').isNumeric().isLength({ min: 0 }),
];

export const updateProduct: ValidationChain[] = [query('productId', 'productId is undefined or not a valid string!').isString().toInt()];

export const deleteProduct: ValidationChain[] = [query('productId', 'productId is undefined or not a valid string!').isString().toInt()];
