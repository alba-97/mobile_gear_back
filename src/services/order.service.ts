import { Deliverys, Orders } from "../models";

const getOrderById = async (id?: number) => {
  return await Orders.findByPk(id, {
    include: Deliverys,
  });
};

const createOrder = async (data: any) => {
  return await Orders.create(data);
};

export default { getOrderById, createOrder };
