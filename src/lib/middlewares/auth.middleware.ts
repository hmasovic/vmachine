import { NextFunction, Response } from 'express';

import { buildMessageResponse } from '@lib/helpers';
import { SessionsService } from '@services/index';

import { SecuredBaseRequest } from '@schemes/common';

import { HTTP_STATUSES } from '@lib/constants';

/**
 * Helper middleware function used for checking the auth token and passing the user info downstream.
 *
 * @param  {SecuredBaseRequest} req - The secured base request
 * @param  {Response} res - The base response
 * @param  {NextFunction} next - The next function used for calling the next middleware
 */
export const authMiddleware = async (req: SecuredBaseRequest, res: Response, next: NextFunction) => {
  try {
    const token: string = req.cookies?.Authorization || req.header('authorization').split('Bearer ')[1] || null;

    if (!token) {
      return res.status(HTTP_STATUSES.NOT_FOUND).send(buildMessageResponse('Authentication token missing!'));
    }

    const user = await SessionsService.getUserBySessionToken(token);

    if (!user) {
      return res.status(HTTP_STATUSES.UNAUTHORIZED).send(buildMessageResponse('Authentication token not valid!'));
    }

    req.locals = { user };
    return next();
  } catch (error) {
    return res.status(HTTP_STATUSES.UNAUTHORIZED).send(buildMessageResponse('Wrong authentication token'));
  }
};
