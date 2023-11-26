import express from 'express';

import * as controller from '@handlers/product/controller';
import * as validator from '@handlers/product/validator';
import { authMiddleware, verifyErrors } from '@lib/middlewares';

const router = express.Router();

// private endpoints
router.get('/', authMiddleware, validator.getProduct, verifyErrors, controller.getProduct);
router.post('/', authMiddleware, validator.createProduct, verifyErrors, controller.createProduct);
// router.put('/', authMiddleware, validator.updateUser, verifyErrors, controller.updateUser);
// router.delete('/', authMiddleware, validator.deleteUser, verifyErrors, controller.deleteUser);

export default router;
