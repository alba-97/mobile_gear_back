import { CreationAttributes, WhereOptions } from "sequelize";
import { Delivery, Order } from "../models";
import { Op } from "sequelize";
import { IOrderQuery } from "../interfaces/Order";

const getAll = async (query: IOrderQuery = {}) => {
  const { status, minTotalValue, maxTotalValue } = query;
  const where: WhereOptions<Order> = {};
  if (status) where.status = status;
  switch (true) {
    case !!minTotalValue && !!maxTotalValue:
      where.totalValue = { [Op.between]: [minTotalValue, maxTotalValue] };
      break;
    case !!minTotalValue:
      where.totalValue = { [Op.gte]: minTotalValue };
      break;
    case !!maxTotalValue:
      where.totalValue = { [Op.lte]: minTotalValue };
  }

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
