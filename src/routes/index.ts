import * as express from 'express';

import * as ServiceHandler from '@handlers/service';

import productRouter from './products';
import userRouter from './user';
import vendingMachineRouter from './vending-machine';

/**
 * Function used for registering the routes for the service.
 *
 * @param  {express.Application} app - The express application
 */
export const register = (app: express.Application): void => {
  app.get('/health-check', ServiceHandler.healthCheck);
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/product', productRouter);
  app.use('/api/v1/vending-machine', vendingMachineRouter);
};
