import {
  CreationAttributes,
  IncludeOptions,
  Op,
  WhereOptions,
} from "sequelize";
import { Brand, Category, Product } from "../models";
import { ProductQuery } from "../interfaces/query";
import minMaxFilter from "../utils/minMaxFilter";

export default class ProductRepository {
  async getAll(query: ProductQuery) {
    const {
      modelName,
      categoryName,
      minPrice,
      maxPrice,
      brandName,
      minDiscount,
      maxDiscount,
    } = query;
    const where: WhereOptions<Product> = {};
    const include: IncludeOptions[] = [{ model: Brand }, { model: Category }];

    if (modelName) where.name = { [Op.iLike]: `%${modelName}%` };

    where.discount = minMaxFilter(minDiscount, maxDiscount);
    where.price = minMaxFilter(minPrice, maxPrice);

    if (brandName)
      include[0].where = {
        name: { [Op.iLike]: `%${brandName}%` },
      };

    if (categoryName)
      include[1].where = {
        name: { [Op.iLike]: `%${categoryName}%` },
      };

    const products = await Product.findAll({ where, include });

    return products;
  }

  async getOneById(id: number) {
    return await Product.findByPk(id, {
      include: [Brand, Category],
    });
  }

  async updateOneById(id: number, data: CreationAttributes<Product>) {
    return await Product.update(data, {
      where: { id },
    });
  }

  async updateCategories(categoryId: number) {
    await Product.update({ categoryId: 1 }, { where: { categoryId } });
  }

  async createOne(data: CreationAttributes<Product>) {
    return await Product.create(data);
  }

  async deleteOneById(id: number) {
    return await Product.destroy({
      where: { id },
    });
  }
}
