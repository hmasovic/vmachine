import express from 'express';

import * as controller from '@handlers/vending-machine/controller';
import * as validator from '@handlers/vending-machine/validator';
import { authMiddleware, buyerMiddleware, verifyErrors } from '@lib/middlewares';

const router = express.Router();

// private endpoints
router.post('/deposit', authMiddleware, buyerMiddleware, validator.depositCoin, verifyErrors, controller.depositCoin);
router.post('/buy', authMiddleware, buyerMiddleware, validator.buyProduct, verifyErrors, controller.buyProduct);
router.post('/reset', authMiddleware, buyerMiddleware, validator.resetDepositedCoins, verifyErrors, controller.resetDepositedCoins);

export default router;
