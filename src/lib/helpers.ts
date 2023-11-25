import crypto from 'crypto';

import { MessageResponseSchema } from '../schemes/common';

/**
 * Helper function used for building the base error response.
 *
 * @param  {string} message The message to be sent to the client
 * @returns ErrorResponse - Response defined in the base schemes
 */
export const buildErrorResponse = (message: string): MessageResponseSchema => {
  return { message };
};

/**
 * Helper function used for generating a hashed password.
 *
 * @param  {string} password - Password to be hashed
 * @returns string - Hashed password
 */
export const createHashedPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('base64');
};

/**
 * Helper function used for creating a random token.
 *
 * @returns string - A generated random token
 */
export const createRandomToken = (): string => {
  return crypto.randomBytes(20).toString('hex');
};
