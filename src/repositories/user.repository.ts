import { CreationAttributes, IncludeOptions, WhereOptions } from "sequelize";
import { Order, PaymentInfo, User } from "../models";
import { Op } from "sequelize";
import { IUserQuery } from "../interfaces/User";

const getAll = async (query: IUserQuery) => {
  const {
    is_admin,
    username,
    email,
    first_name,
    last_name,
    birth_date,
    idNumber,
  } = query;
  const where: WhereOptions<User> = {};
  const include: IncludeOptions[] = [{ model: PaymentInfo }];

  if (is_admin) where.is_admin = is_admin;
  if (username) where.username = { [Op.iLike]: `%${username}%` };
  if (email) where.email = { [Op.iLike]: `%${email}%` };

  if (first_name)
    include[0].where = {
      first_name: { [Op.iLike]: `%${first_name}%` },
      ...include[0].where,
    };

  if (last_name)
    include[0].where = {
      last_name: { [Op.iLike]: `%${last_name}%` },
      ...include[0].where,
    };

  if (birth_date)
    include[0].where = {
      birth_date,
      ...include[0].where,
    };

  if (idNumber)
    include[0].where = {
      idNumber,
      ...include[0].where,
    };

  const products = await User.findAll({
    where,
    include,
    attributes: { exclude: ["password", "salt"] },
  });

  return products;
};

const getOneById = async (id: number) => {
  return await User.findByPk(id, {
    include: [PaymentInfo, Order],
    attributes: { exclude: ["password", "salt"] },
  });
};

const getOne = async (data: CreationAttributes<User>) => {
  return await User.findOne({
    where: data,
    include: [PaymentInfo, Order],
    attributes: { exclude: ["password", "salt"] },
  });
};

const updateOneById = async (id: number, data: CreationAttributes<User>) => {
  return await User.update(data, {
    where: { id },
  });
};

const createOne = async (data: CreationAttributes<User>) => {
  return await User.create(data);
};

const deleteOneById = async (id: number) => {
  return await User.destroy({
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
