import { Op } from "sequelize";
import { Brands, Categories, Products } from "../models";

const listProducts = async () => {
  return await Products.findAll();
};

const discountedProducts = async () => {
  return await Products.findAll({
    where: {
      discount: { [Op.gt]: 15 },
    },
    include: [Categories, Brands],
  });
};

const getProduct = async (id: number) => {
  return await Products.findByPk(id, {
    include: [Brands, Categories],
  });
};

const editProduct = async (id: number, productData: any) => {
  return await Products.update(productData, {
    where: { id },
  });
};

const addProduct = async (productData: any) => {
  return await Products.create(productData);
};

const deleteProduct = async (id: number) => {
  return await Products.destroy({
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
