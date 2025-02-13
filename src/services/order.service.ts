import { CreationAttributes } from "sequelize";
import { Order, CartItem, User } from "../models";
import CartItemService from "./cart-item.service";
import OrderRepository from "../repositories/order.repository";
import UserRepository from "../repositories/user.repository";
import DeliveryRepository from "../repositories/delivery.repository";
import CartItemRepository from "../repositories/cart-item.repository";
import { HttpError } from "../utils/httpError";
import EmailRepository from "../repositories/email.repository";
import PaymentRepository from "../repositories/payment.repository";

export default class OrderService {
  private paymentRepository: PaymentRepository;
  private cartItemService: CartItemService;
  private emailRepository: EmailRepository;
  private orderRepository: OrderRepository;
  private userRepository: UserRepository;
  private deliveryRepository: DeliveryRepository;
  private cartItemRepository: CartItemRepository;

  constructor({
    paymentRepository,
    cartItemService,
    emailRepository,
    orderRepository,
    userRepository,
    deliveryRepository,
    cartItemRepository,
  }: {
    paymentRepository: PaymentRepository;
    cartItemService: CartItemService;
    emailRepository: EmailRepository;
    orderRepository: OrderRepository;
    userRepository: UserRepository;
    deliveryRepository: DeliveryRepository;
    cartItemRepository: CartItemRepository;
  }) {
    this.paymentRepository = paymentRepository;
    this.cartItemService = cartItemService;
    this.emailRepository = emailRepository;
    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
    this.deliveryRepository = deliveryRepository;
    this.cartItemRepository = cartItemRepository;
  }

  async getPaymentIntent({
    amount,
    currency,
  }: {
    amount: number;
    currency: string;
  }) {
    return await this.paymentRepository.getPaymentIntent(amount, currency);
  }

  async getOrderById(id: number) {
    return await this.orderRepository.getOneById(id);
  }

  async addToCheckout(userId: number, data: CreationAttributes<Order>) {
    const user = await this.userRepository.getOneById(userId);
    if (!user) throw new HttpError(404, "User not found");

    const delivery = await this.deliveryRepository.createOne(data);
    const order = await this.orderRepository.createOne({
      status: "checkout",
      delivery: delivery,
    });

    order.setUsers([user]);

    const cartItems = data.map((item: { id: number; qty: number }) => {
      return {
        orderId: order.id,
        productId: item.id,
        userId: user.id,
        qty: item.qty,
        status: "checkout",
      };
    });
    await this.cartItemRepository.createOne(cartItems);
    await this.userRepository.updateOneById(userId, { checkoutId: order.id });
  }

  async createOrder(data: CreationAttributes<Order>) {
    return await this.orderRepository.createOne(data);
  }

  async confirmProduct(user: User, order: Order) {
    this.cartItemService.updateCartItem(user.id, {
      status: "purchased",
    });
    user.setOrders([order]);
    const cartItems = await this.cartItemService.getCartItems({
      orderId: user.checkoutId,
    });

    const products = cartItems
      .map((item: CartItem) => item.product?.name)
      .join(", ");

    await this.emailRepository.send(
      user.email,
      "Thanks for your purchase!",
      `You bought ${products}\n\nIt arrives ${order.delivery.eta}`
    );
  }
}
