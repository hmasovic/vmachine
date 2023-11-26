import { NextFunction, Response } from 'express';

import { buildMessageResponse } from '@lib/helpers';

import { UserRole } from '@lib/db/interfaces';
import { SecuredBaseRequest } from '@schemes/common';

import { HTTP_STATUSES } from '@lib/constants';

/**
 * Helper middleware function used for checking if the user has the role of a buyer.
 *
 * @param  {SecuredBaseRequest} req - The secured base request
 * @param  {Response} res - The base response
 * @param  {NextFunction} next - The next function used for calling the next middleware
 */
export const buyerMiddleware = async (req: SecuredBaseRequest, res: Response, next: NextFunction) => {
  const userRole = req.locals.user.role;

  if (userRole !== UserRole.BUYER) {
    return res.status(HTTP_STATUSES.UNAUTHORIZED).send(buildMessageResponse('The user is not a buyer!'));
  }

  return next();
};
