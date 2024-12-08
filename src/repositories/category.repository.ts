import { CreationAttributes, WhereOptions } from "sequelize";
import { Category } from "../models";
import { ICategoryQuery } from "../interfaces/Category";
import { Op } from "sequelize";

const getAll = async (query: ICategoryQuery = {}) => {
  const { name } = query;
  const where: WhereOptions<Category> = {};
  if (name) where.name = { [Op.iLike]: `%${name}%` };

  const products = await Category.findAll({ where });
  return products;
};

const getOneById = async (id: number) => {
  return await Category.findByPk(id);
};

const getOne = async (data: CreationAttributes<Category>) => {
  return await Category.findOne({ where: data });
};

const updateOneById = async (
  id: number,
  data: CreationAttributes<Category>
) => {
  return await Category.update(data, {
    where: { id },
  });
};

const createOne = async (data: CreationAttributes<Category>) => {
  return await Category.create(data);
};

const deleteOneById = async (id: number) => {
  return await Category.destroy({
    where: { id },
  });
};

export default {
  getAll,
  getOneById,
  getOne,
  updateOneById,
  createOne,
  deleteOneById,
};
