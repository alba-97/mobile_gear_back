import { IncludeOptions, Op, WhereOptions } from "sequelize";
import { Brand, Category, Product } from "../models";
import { IProductQuery } from "../interfaces/Product";

const findAll = async (query: IProductQuery) => {
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
        [Op.between]: [Number(minDiscount), Number(maxDiscount)],
      };
    case !!minDiscount:
      where.discount = { [Op.gte]: Number(minDiscount) };
    case !!maxDiscount:
      where.discount = { [Op.lte]: Number(maxDiscount) };
  }

  switch (true) {
    case !!minPrice && !!maxPrice:
      where.price = { [Op.between]: [Number(minPrice), Number(maxPrice)] };
      break;
    case !!minPrice:
      where.price = { [Op.gte]: Number(minPrice) };
      break;
    case !!maxPrice:
      where.price = { [Op.lte]: Number(maxPrice) };
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

  return await Product.findAll({ where, include });
};

const getOneById = async (id: number) => {
  return await Product.findByPk(id, {
    include: [Brand, Category],
  });
};

const updateOneById = async (id: number, data: any) => {
  return await Product.update(data, {
    where: { id },
  });
};

const createOne = async (data: any) => {
  return await Product.create(data);
};

const deleteOneById = async (id: number) => {
  return await Product.destroy({
    where: { id },
  });
};

export default { findAll, getOneById, updateOneById, createOne, deleteOneById };
