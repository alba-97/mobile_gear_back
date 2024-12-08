import {
  CreationAttributes,
  IncludeOptions,
  Op,
  WhereOptions,
} from "sequelize";
import { Brand, Category, Product } from "../models";
import { IProductQuery } from "../interfaces/Product";

const getAll = async (query: IProductQuery) => {
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

  switch (true) {
    case !!minDiscount && !!maxDiscount:
      where.discount = {
        [Op.between]: [minDiscount, maxDiscount],
      };
      break;
    case !!minDiscount:
      where.discount = { [Op.gte]: minDiscount };
      break;
    case !!maxDiscount:
      where.discount = { [Op.lte]: maxDiscount };
      break;
  }

  switch (true) {
    case !!minPrice && !!maxPrice:
      where.price = { [Op.between]: [minPrice, maxPrice] };
      break;
    case !!minPrice:
      where.price = { [Op.gte]: minPrice };
      break;
    case !!maxPrice:
      where.price = { [Op.lte]: maxPrice };
      break;
  }

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
};

const getOneById = async (id: number) => {
  return await Product.findByPk(id, {
    include: [Brand, Category],
  });
};

const updateOneById = async (id: number, data: CreationAttributes<Product>) => {
  return await Product.update(data, {
    where: { id },
  });
};

const updateCategories = async (categoryId: number) => {
  await Product.update({ categoryId: 1 }, { where: { categoryId } });
};

const createOne = async (data: CreationAttributes<Product>) => {
  return await Product.create(data);
};

const deleteOneById = async (id: number) => {
  return await Product.destroy({
    where: { id },
  });
};

export default {
  getAll,
  getOneById,
  updateOneById,
  updateCategories,
  createOne,
  deleteOneById,
};
