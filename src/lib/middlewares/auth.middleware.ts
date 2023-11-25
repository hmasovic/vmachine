import { NextFunction, Response } from 'express';

import { SessionsService } from '@services/index';

import { SecuredBaseRequest } from '@schemes/common';

import { HTTP_STATUSES } from '@lib/constants';

export const authMiddleware = async (req: SecuredBaseRequest, res: Response, next: NextFunction) => {
  try {
    const token: string = req.cookies?.Authorization || req.header('authorization').split('Bearer ')[1] || null;

    if (!token) {
      return res.status(HTTP_STATUSES.NOT_FOUND).send('Authentication token missing!');
    }

    const user = await SessionsService.getUserBySessionToken(token);

    if (!user) {
      return res.status(HTTP_STATUSES.UNAUTHORIZED).json('Authentication token not valid!');
    }

    req.locals = user;
    return next();
  } catch (error) {
    return res.status(HTTP_STATUSES.UNAUTHORIZED).send('Wrong authentication token');
  }
};
