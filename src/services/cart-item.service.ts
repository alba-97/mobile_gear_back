import CartItemRepository from "../repositories/cart-item.repository";
import { CreationAttributes } from "sequelize";
import { CartItem } from "../models";
import { CartItemQuery } from "../interfaces/query";

export default class CartItemService {
  private cartItemRepository: CartItemRepository;

  constructor({
    cartItemRepository,
  }: {
    cartItemRepository: CartItemRepository;
  }) {
    this.cartItemRepository = cartItemRepository;
  }

  async getCartItems(where: CartItemQuery = {}) {
    return await this.cartItemRepository.getAll(where);
  }

  async createCartItem(data: CreationAttributes<CartItem>) {
    return await this.cartItemRepository.createOne(data);
  }

  async updateCartItem(id: number, data: CreationAttributes<CartItem>) {
    return await this.cartItemRepository.updateOneById(id, data);
  }

  async deleteCartItem(id: number) {
    return await this.cartItemRepository.deleteOneById(id);
  }
}
