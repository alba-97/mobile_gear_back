import ProductOrderRepository from "../repositories/product-order.repository";
import { CreationAttributes } from "sequelize";
import { ProductOrder } from "../models";
import { ProductOrderQuery } from "../interfaces/query";

export default class ProductOrderService {
  private productOrderRepository: ProductOrderRepository;

  constructor({
    productOrderRepository,
  }: {
    productOrderRepository: ProductOrderRepository;
  }) {
    this.productOrderRepository = productOrderRepository;
  }

  async getProductOrders(where: ProductOrderQuery = {}) {
    return await this.productOrderRepository.getAll(where);
  }

  async createProductOrder(data: CreationAttributes<ProductOrder>) {
    return await this.productOrderRepository.createOne(data);
  }

  async updateProductOrder(id: number, data: CreationAttributes<ProductOrder>) {
    return await this.productOrderRepository.updateOneById(id, data);
  }

  async deleteProductOrder(id: number) {
    return await this.productOrderRepository.deleteOneById(id);
  }
}
