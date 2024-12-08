import { CreationAttributes, WhereOptions } from "sequelize";
import { Delivery } from "../models";
import { Op } from "sequelize";
import { IDeliveryQuery } from "../interfaces/Delivery";
import minMaxFilter from "../utils/minMaxFilter";

const getAll = async (query: IDeliveryQuery = {}) => {
  const { type, minPrice, maxPrice, minEta, maxEta } = query;
  const where: WhereOptions<Delivery> = {};
  if (type) where.type = type;
  where.price = minMaxFilter(minPrice, maxPrice);
  where.eta = minMaxFilter(minEta, maxEta);

  const deliveries = await Delivery.findAll({ where });
  return deliveries;
};

const getOneById = async (id: number) => {
  return await Delivery.findByPk(id);
};

const updateOneById = async (
  id: number,
  data: CreationAttributes<Delivery>
) => {
  return await Delivery.update(data, {
    where: { id },
  });
};

const createOne = async (data: CreationAttributes<Delivery>) => {
  return await Delivery.create(data);
};

const deleteOneById = async (id: number) => {
  return await Delivery.destroy({
    where: { id },
  });
};

export default { getAll, getOneById, updateOneById, createOne, deleteOneById };
