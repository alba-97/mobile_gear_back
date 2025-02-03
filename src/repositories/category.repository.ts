import { CreationAttributes, WhereOptions } from "sequelize";
import { Category } from "../models";
import { Op } from "sequelize";
import { CategoryQuery } from "../interfaces/query";

export default class CategoryRepository {
  async getAll(query: CategoryQuery = {}) {
    const { name } = query;
    const where: WhereOptions<Category> = {};
    if (name) where.name = { [Op.iLike]: `%${name}%` };

    const products = await Category.findAll({ where });
    return products;
  }

  async getOneById(id: number) {
    return await Category.findByPk(id);
  }

  async getOne(data: CreationAttributes<Category>) {
    return await Category.findOne({ where: data });
  }

  async updateOneById(id: number, data: CreationAttributes<Category>) {
    return await Category.update(data, {
      where: { id },
    });
  }

  async createOne(data: CreationAttributes<Category>) {
    return await Category.create(data);
  }

  async deleteOneById(id: number) {
    return await Category.destroy({
      where: { id },
    });
  }
}
