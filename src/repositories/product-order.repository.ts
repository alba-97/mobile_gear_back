import { CreationAttributes, WhereOptions } from "sequelize";
import { Order, Product, ProductOrder } from "../models";
import { ProductOrderQuery } from "../interfaces/query";

export default class ProductOrderRepository {
  async getAll(query: ProductOrderQuery = {}) {
    const { orderId, productId } = query;
    const where: WhereOptions<ProductOrder> = {};

    if (orderId) where.orderId = orderId;
    if (productId) where.productId = productId;

    const productOrders = await ProductOrder.findAll({
      where,
      include: [{ model: Order }, { model: Product }],
    });
    return productOrders;
  }

  async getOneById(id: number) {
    return await ProductOrder.findByPk(id, {
      include: [{ model: Order }, { model: Product }],
    });
  }

  async getOne(data: CreationAttributes<ProductOrder>) {
    return await ProductOrder.findOne({
      where: data,
      include: [{ model: Order }, { model: Product }],
    });
  }

  async updateOneById(id: number, data: CreationAttributes<ProductOrder>) {
    return await ProductOrder.update(data, {
      where: { id },
    });
  }

  async createOne(data: CreationAttributes<ProductOrder>) {
    return await ProductOrder.create(data);
  }

  async deleteOneById(id: number) {
    return await ProductOrder.destroy({
      where: { id },
    });
  }
}
