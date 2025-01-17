import { CreationAttributes, IncludeOptions, WhereOptions } from "sequelize";
import { Order, Product, User } from "../models";
import { Op } from "sequelize";
import ProductOrder from "../models/ProductOrder";
import { IProductOrderQuery } from "../interfaces/ProductOrder";

const getAll = async (query: IProductOrderQuery) => {
  const { username, productName, qty } = query;
  const where: WhereOptions<IProductOrderQuery> = {};
  const include: IncludeOptions[] = [
    { model: User, attributes: { exclude: ["password", "salt"] } },
    { model: Product },
    { model: Order },
  ];

  if (qty) where.qty = qty;

  if (username)
    include[0].where = {
      username: { [Op.iLike]: `%${username}%` },
    };

  if (productName)
    include[1].where = {
      name: { [Op.iLike]: `%${productName}%` },
    };

  const productOrders = await ProductOrder.findAll({ where, include });

  return productOrders;
};

const getOneById = async (id: number) => {
  return await Product.findByPk(id, {
    include: [User, Product, Order],
  });
};

const create = async (data: CreationAttributes<ProductOrder>[]) => {
  return await Product.bulkCreate(data);
};

const updateOneById = async (
  id: number,
  data: CreationAttributes<ProductOrder>
) => {
  return await Product.update(data, {
    where: { id },
  });
};

const deleteOneById = async (id: number) => {
  return await Product.destroy({
    where: { id },
  });
};

export default { getAll, getOneById, updateOneById, create, deleteOneById };
