import { CreationAttributes, WhereOptions } from "sequelize";
import { Order, PaymentInfo, Product, User } from "../models";
import { OrderQuery } from "../interfaces/query";
import { Op } from "sequelize";

export default class OrderRepository {
  async getAll(query: OrderQuery = {}) {
    const { status, userId, minTotalPrice, maxTotalPrice, startDate, endDate } =
      query;
    const where: WhereOptions<Order> = {};
    const include = [
      { model: User, attributes: { exclude: ["password", "salt"] } },
      { model: Product },
      { model: PaymentInfo },
    ];

    if (status) where.status = status;
    if (userId) where.userId = userId;

    if (minTotalPrice !== undefined && maxTotalPrice !== undefined) {
      where.totalPrice = {
        [Op.between]: [minTotalPrice, maxTotalPrice],
      };
    }

    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [startDate, endDate],
      };
    }

    const orders = await Order.findAll({
      where,
      include,
      order: [["createdAt", "DESC"]],
    });

    return orders;
  }

  async getOneById(id: number) {
    return await Order.findByPk(id, {
      include: [
        { model: User, attributes: { exclude: ["password", "salt"] } },
        { model: Product },
        { model: PaymentInfo },
      ],
    });
  }

  async getOne(data: CreationAttributes<Order>) {
    return await Order.findOne({
      where: data,
      include: [
        { model: User, attributes: { exclude: ["password", "salt"] } },
        { model: Product },
        { model: PaymentInfo },
      ],
    });
  }

  async updateOneById(id: number, data: CreationAttributes<Order>) {
    return await Order.update(data, {
      where: { id },
    });
  }

  async createOne(data: CreationAttributes<Order>) {
    return await Order.create(data);
  }

  async deleteOneById(id: number) {
    return await Order.destroy({
      where: { id },
    });
  }
}
