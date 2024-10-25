import { IncludeOptions, WhereOptions } from "sequelize";
import { IUserQuery } from "../interfaces/User";
import { Order, PaymentInfo, User } from "../models";
import { Op } from "sequelize";
import { UserDto } from "../dto/user.dto";

const findAll = async (query: IUserQuery) => {
  const { is_admin, username, email, first_name, last_name, birth_date, dni } =
    query;
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

  if (dni)
    include[0].where = {
      dni,
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

const updateOneById = async (id: number, data: Partial<UserDto>) => {
  return await User.update(data, {
    where: { id },
  });
};

const createOne = async (data: UserDto) => {
  return await User.create(data);
};

const deleteOneById = async (id: number) => {
  return await User.destroy({
    where: { id },
  });
};

export default { findAll, getOneById, updateOneById, createOne, deleteOneById };
