import { body, ValidationChain } from 'express-validator';

import { UserRole } from '@lib/db/interfaces';

export const createUser: ValidationChain[] = [
  body('username', 'username is undefined or not a valid string!').isString(),
  body('password', 'password is undefined or not a valid string!').isString(),
  body('role', 'role is undefined or not a valid string!').isIn(Object.keys(UserRole)).withMessage('role is not one of the required values!'),
];

export const getUser: ValidationChain[] = [];

export const updateUser: ValidationChain[] = [body('username', 'username is undefined or not a valid string!').optional().isString()];

export const deleteUser: ValidationChain[] = [];

export const loginUser: ValidationChain[] = [body('username', 'username is undefined or not a valid string!').isString(), body('password', 'password is undefined or not a valid string!').isString()];

export const logoutUserFromAllSessions: ValidationChain[] = [];
