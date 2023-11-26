import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { VerificationErrorModel } from '@schemes/common';

import { HTTP_STATUSES } from '@lib/constants';

/**
 * Helper middleware function used for checking the express validator errors that can appear.
 *
 * @param  {Request} req - The base request
 * @param  {Response} res - The base response
 * @param  {NextFunction} next - The next function used for calling the next middleware
 */
export const verifyErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: VerificationErrorModel[] = [];

  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(HTTP_STATUSES.BAD_REQUEST).json({
    errors: extractedErrors,
  });
};
