import { CreationAttributes, IncludeOptions, WhereOptions } from "sequelize";
import { Order, PaymentInfo, User } from "../models";
import { Op } from "sequelize";
import { UserQuery } from "../interfaces/query";

export default class UserRepository {
  async getAll(query: UserQuery = {}) {
    const {
      isAdmin,
      username,
      email,
      firstName,
      lastName,
      birthDate,
      idNumber,
    } = query;
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
  }

  async getOneById(id: number) {
    return await User.findByPk(id, {
      include: [PaymentInfo, Order],
      attributes: { exclude: ["password", "salt"] },
    });
  }

  async getOne(data: CreationAttributes<User>) {
    return await User.findOne({
      where: data,
      include: [PaymentInfo, Order],
    });
  }

  async updateOneById(id: number, data: CreationAttributes<User>) {
    return await User.update(data, {
      where: { id },
    });
  }

  async createOne(data: CreationAttributes<User>) {
    return await User.create(data);
  }

  async deleteOneById(id: number) {
    return await User.destroy({
      where: { id },
    });
  }
}
