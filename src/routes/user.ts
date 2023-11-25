import express from 'express';

import * as controller from '@handlers/user/controller';
import * as validator from '@handlers/user/validator';
import { authMiddleware, verifyErrors } from '@lib/middlewares';

const router = express.Router();

// public endpoints
router.post('/', validator.createUser, verifyErrors, controller.createUser);
router.post('/', validator.loginUser, verifyErrors, controller.loginUser);

// private endpoints

export default router;
