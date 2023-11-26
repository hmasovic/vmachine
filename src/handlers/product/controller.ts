import { logger } from '@logs/index';

import { buildMessageResponse } from '@lib/helpers';
import { ProductsService } from '@services/index';

import { Product } from '@lib/db/interfaces';
import { CreateProductResponseDto } from '@schemes/interfaces';
import {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductRequest,
  DeleteProductResponse,
  GetProductRequest,
  GetProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from '@schemes/products';

import { HTTP_STATUSES } from '@lib/constants';
import { EntityNotFound, ProductEditorNotSeller } from '@lib/exceptions';

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
    const status = expectedError ? HTTP_STATUSES.NOT_FOUND : HTTP_STATUSES.INTERNAL_SERVER_ERROR;

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
  } catch (e) {
    logger.error(`[handlers/product/createProduct] - ${e.message}`);

    const expectedError = e instanceof ProductEditorNotSeller;

    const message = expectedError ? e.message : 'An error occured, please contact support!';
    const status = expectedError ? HTTP_STATUSES.UNPROCESSABLE_ENTITY : HTTP_STATUSES.INTERNAL_SERVER_ERROR;

    return res.status(status).send(buildMessageResponse(message));
  }
};

/**
 * Handler function used for updating an existing product. Only the seller can update the product.
 *
 * @param  {UpdateProductRequest} req - Request defined in the schemes
 * @param  {UpdateProductResponse} res - Response defined in the schemes
 */
export const updateProduct = async (req: UpdateProductRequest, res: UpdateProductResponse) => {
  try {
    const userId = req.locals?.user.id;
    const productId = req.body.productId;

    const productToUpdate: Partial<Product> = {
      cost: req.body.data.cost,
      productName: req.body.data.productName,
      amountAvailable: req.body.data.amountAvailable,
    };

    const updatedProduct = await ProductsService.updateProduct(userId, productId, productToUpdate);

    const result: CreateProductResponseDto = {
      id: updatedProduct.id,
      cost: updatedProduct.cost,
      sellerId: updatedProduct.sellerId,
      productName: updatedProduct.productName,
      amountAvailable: updatedProduct.amountAvailable,
    };

    return res.status(HTTP_STATUSES.OK).send(result);
  } catch (e) {
    logger.error(`[handlers/product/updateProduct] - ${e.message}`);

    const editorNotASeller = e instanceof ProductEditorNotSeller;
    const productNotFound = e instanceof EntityNotFound;

    const message = editorNotASeller || productNotFound ? e.message : 'An error occured, please contact support!';
    const status = productNotFound ? HTTP_STATUSES.NOT_FOUND : editorNotASeller ? HTTP_STATUSES.UNPROCESSABLE_ENTITY : HTTP_STATUSES.INTERNAL_SERVER_ERROR;

    return res.status(status).send(buildMessageResponse(message));
  }
};

/**
 * Handler function used for deleting an existing product. Only the seller can delete the product.
 *
 * @param  {UpdateProductRequest} req - Request defined in the schemes
 * @param  {UpdateProductResponse} res - Response defined in the schemes
 */
export const deleteProduct = async (req: DeleteProductRequest, res: DeleteProductResponse) => {
  try {
    const userId = req.locals?.user.id;
    const productId = req.body.productId;

    await ProductsService.deleteProduct(userId, productId);

    return res.status(HTTP_STATUSES.OK).send(buildMessageResponse('Successfully deleted the product!'));
  } catch (e) {
    logger.error(`[handlers/product/deleteProduct] - ${e.message}`);

    const editorNotASeller = e instanceof ProductEditorNotSeller;
    const productNotFound = e instanceof EntityNotFound;

    const message = editorNotASeller || productNotFound ? e.message : 'An error occured, please contact support!';
    const status = productNotFound ? HTTP_STATUSES.NOT_FOUND : editorNotASeller ? HTTP_STATUSES.UNPROCESSABLE_ENTITY : HTTP_STATUSES.INTERNAL_SERVER_ERROR;

    return res.status(status).send(buildMessageResponse(message));
  }
};
