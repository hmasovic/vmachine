import { ProductsRepository } from '@repositories/index';

import { Product, UserRole } from '@lib/db/interfaces';
import { Products } from '@lib/db/models';
import { AuthenticatedUser } from './interfaces';

import { EntityNotFound, ProductEditorNotSeller } from '@lib/exceptions';

/**
 * Service function used for getting a product by an id.
 *
 * @param  {number} productId - The product id
 * @returns Promise - Result delegated back as {@link Products}
 */
export const getProduct = async (productId: number): Promise<Products> => {
  const product = await ProductsRepository.getProduct(productId);

  if (!product) {
    throw new EntityNotFound(`Product with the id: ${productId} was not found!`);
  }

  return product;
};

/**
 * Service function used for creating a new product.
 *
 * @param  {ProduAuthenticatedUserct} user - The user creating the product
 * @param  {Product} product - The product info
 * @returns Promise - Result delegated back as {@link Products}
 */
export const createProduct = async (user: AuthenticatedUser, product: Product): Promise<Products> => {
  if (user.role !== UserRole.SELLER) {
    throw new ProductEditorNotSeller(`The user with the id: ${user.id} is not a seller!`);
  }

  return await ProductsRepository.createProduct(product);
};

/**
 * Service function used for updating a new product. Only the person selling the product
 * can update the info of the product.
 *
 * @param  {number} userId - The user id
 * @param  {number} productId - The product id
 * @param  {Product} newProductInfo - Partial product info
 * @returns Promise - Result delegated back as {@link Products}
 */
export const updateProduct = async (userId: number, productId: number, newProductInfo: Partial<Product>): Promise<Products> => {
  const product = await ProductsRepository.getProduct(productId);

  if (!product) {
    throw new EntityNotFound(`Product with the id: ${productId} was not found!`);
  }

  const productSellerId = product.sellerId;

  if (userId !== productSellerId) {
    throw new ProductEditorNotSeller(`The user with the id: ${userId} is not the seller for the product with the id: ${productId}!`);
  }

  return await ProductsRepository.updateProduct(productId, newProductInfo);
};

/**
 * Service function used for deleting a product. Only the person selling the product
 * can delete the product.
 *
 * @param  {number} userId - The user id
 * @param  {number} productId - The product id
 */
export const deleteProduct = async (userId: number, productId: number) => {
  const product = await ProductsRepository.getProduct(productId);

  if (!product) {
    throw new EntityNotFound(`Product with the id: ${productId} was not found!`);
  }

  const productSellerId = product.sellerId;

  if (userId !== productSellerId) {
    throw new ProductEditorNotSeller(`The user with the id: ${userId} is not the seller for the product with the id: ${productId}!`);
  }

  await ProductsRepository.deleteProduct(productId);
};
