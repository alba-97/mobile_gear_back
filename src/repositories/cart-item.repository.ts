import { CreationAttributes, WhereOptions } from "sequelize";
import { Order, Product, CartItem } from "../models";
import { CartItemQuery } from "../interfaces/query";

export default class CartItemRepository {
  async getAll(query: CartItemQuery = {}) {
    const { orderId, productId } = query;
    const where: WhereOptions<CartItem> = {};

    if (orderId) where.orderId = orderId;
    if (productId) where.productId = productId;

    const cartItems = await CartItem.findAll({
      where,
      include: [{ model: Order }, { model: Product }],
    });
    return cartItems;
  }

  async getOneById(id: number) {
    return await CartItem.findByPk(id, {
      include: [{ model: Order }, { model: Product }],
    });
  }

  async getOne(data: CreationAttributes<CartItem>) {
    return await CartItem.findOne({
      where: data,
      include: [{ model: Order }, { model: Product }],
    });
  }

  async updateOneById(id: number, data: CreationAttributes<CartItem>) {
    return await CartItem.update(data, {
      where: { id },
    });
  }

  async createOne(data: CreationAttributes<CartItem>) {
    return await CartItem.create(data);
  }

  async deleteOneById(id: number) {
    return await CartItem.destroy({
      where: { id },
    });
  }
}
