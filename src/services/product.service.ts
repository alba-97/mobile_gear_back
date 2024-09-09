import { Op } from "sequelize";
import { Brand, Category, Product } from "../models";

const listProducts = async () => {
  return await Product.findAll({});
};

const discountedProducts = async () => {
  return await Product.findAll({
    where: {
      discount: { [Op.gt]: 15 },
    },
    include: [Brand, Category],
  });
};

const getProduct = async (id: number) => {
  return await Product.findByPk(id, {
    include: [Brand, Category],
  });
};

const editProduct = async (id: number, productData: any) => {
  return await Product.update(productData, {
    where: { id },
  });
};

const addProduct = async (productData: any) => {
  return await Product.create(productData);
};

const deleteProduct = async (id: number) => {
  return await Product.destroy({
    where: { id },
  });
};

export default {
  listProducts,
  discountedProducts,
  getProduct,
  editProduct,
  addProduct,
  deleteProduct,
};
