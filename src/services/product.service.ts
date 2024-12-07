import { CreationAttributes } from "sequelize";
import productRepository from "../repositories/product.repository";
import { Product } from "../models";
import { IProductQuery } from "../interfaces/Product";

const listProducts = async (query: IProductQuery) => {
  return await productRepository.findAll(query);
};

const discountedProducts = async () => {
  return await productRepository.findAll({
    minDiscount: 15,
  });
};

const getProduct = async (id: number) => {
  return await productRepository.getOneById(id);
};

const editProduct = async (id: number, data: CreationAttributes<Product>) => {
  return await productRepository.updateOneById(id, data);
};

const addProduct = async (data: CreationAttributes<Product>) => {
  return await productRepository.createOne(data);
};

const deleteProduct = async (id: number) => {
  return await productRepository.deleteOneById(id);
};

export default {
  listProducts,
  discountedProducts,
  getProduct,
  editProduct,
  addProduct,
  deleteProduct,
};
