import { CreationAttributes, IncludeOptions, WhereOptions } from "sequelize";
import { Order, PaymentInfo, User } from "../models";
import { Op } from "sequelize";
import { IUserQuery } from "../interfaces/User";

const getAll = async (query: IUserQuery = {}) => {
  const { isAdmin, username, email, firstName, lastName, birthDate, idNumber } =
    query;
  const where: WhereOptions<User> = {};
  const include: IncludeOptions[] = [{ model: PaymentInfo }];

  if (isAdmin) where.isAdmin = isAdmin;
  if (username) where.username = { [Op.iLike]: `%${username}%` };
  if (email) where.email = { [Op.iLike]: `%${email}%` };

  if (firstName)
    include[0].where = {
      firstName: { [Op.iLike]: `%${firstName}%` },
      ...include[0].where,
    };

  if (lastName)
    include[0].where = {
      lastName: { [Op.iLike]: `%${lastName}%` },
      ...include[0].where,
    };

  if (birthDate)
    include[0].where = {
      birthDate,
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
