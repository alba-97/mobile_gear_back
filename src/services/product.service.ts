import { CreationAttributes } from "sequelize";
import ProductRepository from "../repositories/product.repository";
import { Product } from "../models";
import { ProductQuery } from "../interfaces/query";

export default class ProductService {
  private productRepository: ProductRepository;

  constructor({ productRepository }: { productRepository: ProductRepository }) {
    this.productRepository = productRepository;
  }

  async listProducts(query: ProductQuery) {
    return await this.productRepository.getAll(query);
  }

  async discountedProducts() {
    return await this.productRepository.getAll({
      minDiscount: 20,
    });
  }

  async getProduct(id: number) {
    return await this.productRepository.getOneById(id);
  }

  async editProduct(id: number, data: CreationAttributes<Product>) {
    return await this.productRepository.updateOneById(id, data);
  }

  async addProduct(data: CreationAttributes<Product>) {
    return await this.productRepository.createOne(data);
  }

  async deleteProduct(id: number) {
    return await this.productRepository.deleteOneById(id);
  }
}
