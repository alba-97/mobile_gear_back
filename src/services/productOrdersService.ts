import { Orders, Products, Users } from "../models";
import ProductOrders from "../models/ProductOrders";

const getProductOrders = async (where?: any) => {
  return await ProductOrders.findAll({
    where,
    include: [
      { model: Users, attributes: { exclude: ["password", "salt"] } },
      Products,
      Orders,
    ],
  });
};

const updateOrder = async (data: any, where?: any) => {
  return await ProductOrders.update(data, { where });
};

export default {
  getProductOrders,
  updateOrder,
};
