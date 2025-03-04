import { Product } from "../models";
import { ProductQuery } from "../interfaces/product";
import { NotFoundError } from "../utils/errors";
import productRepository from "../repositories/product.repository";

const getAllProducts = async (options: ProductQuery) => {
  return productRepository.getAll(options);
};

const getProductById = async (id: number) => {
  const product = await productRepository.getOneById(id);
  if (!product) throw new NotFoundError(`Product with id ${id} not found`);

  return product;
};

const createProduct = async (product: Partial<Product>) => {
  const newProduct = await productRepository.createOne(product);
  return newProduct;
};

const updateProduct = async (id: number, product: Partial<Product>) => {
  const updatedProduct = await productRepository.updateOneById(id, product);
  if (!updatedProduct)
    throw new NotFoundError(`Product with id ${id} not found`);
  return updatedProduct;
};

const deleteProduct = async (id: number) => {
  const product = await productRepository.deleteOneById(id);
  if (!product) throw new NotFoundError(`Product with id ${id} not found`);
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
