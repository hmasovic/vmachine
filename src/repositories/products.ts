import { Product } from '@lib/db/interfaces';
import { Products } from '@lib/db/models';

import { EntityNotUpdated } from '@lib/exceptions';

/**
 * Repository function used for getting an product by an id.
 *
 * @param  {number} id - The product id
 * @returns Promise - Result delegated back as {@link Products}
 */
export const getProduct = async (id: number): Promise<Products> => {
  return Products.findOne({ where: { id } });
};

/**
 * Repository function used for creating a product.
 *
 * @param  {Product} product - The product info
 * @returns Promise - Result delegated back as {@link Products}
 */
export const createProduct = async (product: Product): Promise<Products> => {
  return Products.create(product, { returning: true });
};

/**
 * Repository function used for updating a product.
 *
 * @param  {number} productId - The product id
 * @param  {Partial<Product>} newProductInfo - The product info to update
 * @returns Promise - Result delegated back as {@link Products}
 */
export const updateProduct = async (productId: number, newProductInfo: Partial<Product>): Promise<Products> => {
  const [productsAffected, products] = await Products.update(newProductInfo, { where: { id: productId }, returning: true });

  if (productsAffected === 0) {
    throw new EntityNotUpdated(`Product with the id: ${productId} was not updated!`);
  }

  return products?.[0];
};

/**
 * Repository function used for deleting a product with the id provided.
 *
 * @param  {number} id - The product id
 */
export const deleteProduct = async (id: number) => {
  await Products.destroy({ where: { id } });
};
