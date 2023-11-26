import express from 'express';

import * as controller from '@handlers/user/controller';
import * as validator from '@handlers/user/validator';
import { authMiddleware, verifyErrors } from '@lib/middlewares';

const router = express.Router();

// public endpoints
router.post('/', validator.createUser, verifyErrors, controller.createUser);
router.post('/login', validator.loginUser, verifyErrors, controller.loginUser);

// private endpoints
router.post('/logout/all', authMiddleware, validator.logoutUserFromAllSessions, verifyErrors, controller.logoutUserFromAllSessions);
router.get('/', authMiddleware, validator.getUser, verifyErrors, controller.getUser);
router.put('/', authMiddleware, validator.updateUser, verifyErrors, controller.updateUser);
router.delete('/', authMiddleware, validator.deleteUser, verifyErrors, controller.deleteUser);

export default router;
