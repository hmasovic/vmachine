import { logger } from '@logs/index';

import { buildMessageResponse } from '@lib/helpers';
import { ProductsService } from '@services/index';

import { Product } from '@lib/db/interfaces';
import { CreateProductResponseDto } from '@schemes/interfaces';
import { CreateProductRequest, CreateProductResponse, GetProductRequest, GetProductResponse } from '@schemes/products';

import { HTTP_STATUSES } from '@lib/constants';
import { EntityNotFound } from '@lib/exceptions';

/**
 * Handler function used for getting a product.
 *
 * @param  {GetProductRequest} req - Request defined in the schemes
 * @param  {GetProductResponse} res - Response defined in the schemes
 */
export const getProduct = async (req: GetProductRequest, res: GetProductResponse) => {
  try {
    const productId = Number(req.query.productId);
    const product = await ProductsService.getProduct(productId);

    const result = {
      id: product.id,
      cost: product.cost,
      sellerId: product.sellerId,
      productName: product.productName,
      amountAvailable: product.amountAvailable,
    };

    return res.status(HTTP_STATUSES.OK).send(result);
  } catch (e) {
    logger.error(`[handlers/product/getProduct] - ${e.message}`);

    const expectedError = e instanceof EntityNotFound;

    const message = expectedError ? e.message : 'An error occured, please contact support!';
    const status = expectedError ? HTTP_STATUSES.UNPROCESSABLE_ENTITY : HTTP_STATUSES.INTERNAL_SERVER_ERROR;

    return res.status(status).send(buildMessageResponse(message));
  }
};

/**
 * Handler function used for creating a new product.
 *
 * @param  {CreateProductRequest} req - Request defined in the schemes
 * @param  {CreateProductResponse} res - Response defined in the schemes
 */
export const createProduct = async (req: CreateProductRequest, res: CreateProductResponse) => {
  try {
    const user = req.locals?.user;
    const newProduct: Product = {
      cost: req.body.cost,
      productName: req.body.productName,
      amountAvailable: req.body.amountAvailable,
      sellerId: user.id,
    };

    const createdProduct = await ProductsService.createProduct(user, newProduct);

    const result: CreateProductResponseDto = {
      id: createdProduct.id,
      cost: createdProduct.cost,
      sellerId: createdProduct.sellerId,
      productName: createdProduct.productName,
      amountAvailable: createdProduct.amountAvailable,
    };

    return res.status(HTTP_STATUSES.OK).send(result);
  } catch (error) {
    logger.error(`[handlers/product/createProduct] - ${error.message}`);
    return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).send(buildMessageResponse('An error occured, please contact support!'));
  }
};
