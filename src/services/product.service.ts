import { IncludeOptions, Op, WhereOptions } from "sequelize";
import { Brand, Category, Product } from "../models";

interface IProductQuery {
  modelName?: string;
  categoryName?: string;
  min?: number;
  max?: number;
  brandName?: string;
}

const listProducts = async (query: IProductQuery) => {
  const { modelName, categoryName, min, max, brandName } = query;
  const where: WhereOptions<Product> = {};
  const include: IncludeOptions[] = [{ model: Brand }, { model: Category }];

  if (modelName) where.name = { [Op.iLike]: `%${modelName}%` };

  if (min || max) {
    if (min && max) where.price = { [Op.between]: [Number(min), Number(max)] };
    else if (min) where.price = { [Op.gte]: Number(min) };
    else where.price = { [Op.lte]: Number(max) };
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

const discountedProducts = async () => {
  return await Product.findAll({
    where: {
      discount: { [Op.gt]: 15 },
    },
    include: [Brand, Category],
  });
};

const getProduct = async (id: number) => {
  return await Product.findByPk(id, {
    include: [Brand, Category],
  });
};

const editProduct = async (id: number, productData: any) => {
  return await Product.update(productData, {
    where: { id },
  });
};

const addProduct = async (productData: any) => {
  return await Product.create(productData);
};

const deleteProduct = async (id: number) => {
  return await Product.destroy({
    where: { id },
  });
};

export default {
  listProducts,
  discountedProducts,
  getProduct,
  editProduct,
  addProduct,
  deleteProduct,
};
