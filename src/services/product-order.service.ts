import { Order, Product, User } from "../models";
import ProductOrder from "../models/ProductOrder";

const getProductOrders = async (where?: any) => {
  return await ProductOrder.findAll({
    where,
    include: [
      { model: User, attributes: { exclude: ["password", "salt"] } },
      Product,
      Order,
    ],
  });
};

const createOrder = async (data: any) => {
  return await ProductOrder.create(data);
};

const updateOrder = async (data: any, where?: any) => {
  return await ProductOrder.update(data, { where });
};

export default {
  getProductOrders,
  createOrder,
  updateOrder,
};
