import { OrderDto } from "../dto/order.dto";
import { Delivery, Order } from "../models";

const getOrderById = async (id?: number) => {
  return await Order.findByPk(id, {
    include: Delivery,
  });
};

const createOrder = async (data: OrderDto) => {
  return await Order.create(data);
};

export default { getOrderById, createOrder };
