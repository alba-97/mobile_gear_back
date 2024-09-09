import { Deliverys, Order } from "../models";

const getOrderById = async (id?: number) => {
  return await Order.findByPk(id, {
    include: Deliverys,
  });
};

const createOrder = async (data: any) => {
  return await Order.create(data);
};

export default { getOrderById, createOrder };
