import { CreationAttributes, WhereOptions } from "sequelize";
import { Delivery } from "../models";
import { Op } from "sequelize";
import { IDeliveryQuery } from "../interfaces/Delivery";

const getAll = async (query: IDeliveryQuery = {}) => {
  const { type, minPrice, maxPrice, minEta, maxEta } = query;
  const where: WhereOptions<Delivery> = {};
  if (type) where.type = type;
  switch (true) {
    case !!minPrice && !!maxPrice:
      where.price = { [Op.between]: [minPrice, maxPrice] };
      break;
    case !!minPrice:
      where.price = { [Op.gte]: minPrice };
      break;
    case !!maxPrice:
      where.price = { [Op.lte]: maxPrice };
  }

  switch (true) {
    case !!minEta && !!maxEta:
      where.eta = { [Op.between]: [minEta, maxEta] };
      break;
    case !!minEta:
      where.eta = { [Op.gte]: minEta };
      break;
    case !!maxEta:
      where.eta = { [Op.lte]: maxEta };
  }

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
