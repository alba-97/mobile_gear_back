import { CreationAttributes, WhereOptions } from "sequelize";
import { Delivery, Order } from "../models";
import { IOrderQuery } from "../interfaces/Order";
import minMaxFilter from "../utils/minMaxFilter";

const getAll = async (query: IOrderQuery = {}) => {
  const { status, mintotalPrice, maxtotalPrice } = query;
  const where: WhereOptions<Order> = {};
  if (status) where.status = status;

  where.totalPrice = minMaxFilter(mintotalPrice, maxtotalPrice);

  const deliveries = await Order.findAll({ where });
  return deliveries;
};

const getOneById = async (id: number) => {
  return await Order.findByPk(id, {
    include: Delivery,
  });
};

const updateOneById = async (id: number, data: CreationAttributes<Order>) => {
  return await Order.update(data, {
    where: { id },
  });
};

const createOne = async (data: CreationAttributes<Order>) => {
  return await Order.create(data);
};

const deleteOneById = async (id: number) => {
  return await Order.destroy({
    where: { id },
  });
};

export default { getAll, getOneById, updateOneById, createOne, deleteOneById };
