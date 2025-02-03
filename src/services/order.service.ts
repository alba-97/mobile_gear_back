import { CreationAttributes } from "sequelize";
import { Order, ProductOrder, User } from "../models";
import ProductOrderService from "./product-order.service";
import OrderRepository from "../repositories/order.repository";
import UserRepository from "../repositories/user.repository";
import DeliveryRepository from "../repositories/delivery.repository";
import ProductOrderRepository from "../repositories/product-order.repository";
import { HttpError } from "../utils/httpError";
import EmailRepository from "../repositories/email.repository";

export default class OrderService {
  private productOrderService: ProductOrderService;
  private emailRepository: EmailRepository;
  private orderRepository: OrderRepository;
  private userRepository: UserRepository;
  private deliveryRepository: DeliveryRepository;
  private productOrderRepository: ProductOrderRepository;

  constructor({
    productOrderService,
    emailRepository,
    orderRepository,
    userRepository,
    deliveryRepository,
    productOrderRepository,
  }: {
    productOrderService: ProductOrderService;
    emailRepository: EmailRepository;
    orderRepository: OrderRepository;
    userRepository: UserRepository;
    deliveryRepository: DeliveryRepository;
    productOrderRepository: ProductOrderRepository;
  }) {
    this.productOrderService = productOrderService;
    this.emailRepository = emailRepository;
    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
    this.deliveryRepository = deliveryRepository;
    this.productOrderRepository = productOrderRepository;
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

    const productOrders = data.map((item: { id: number; quantity: number }) => {
      return {
        orderId: order.id,
        productId: item.id,
        userId: user.id,
        qty: item.quantity,
        status: "checkout",
      };
    });
    await this.productOrderRepository.createOne(productOrders);
    await this.userRepository.updateOneById(userId, { checkoutId: order.id });
  }

  async createOrder(data: CreationAttributes<Order>) {
    return await this.orderRepository.createOne(data);
  }

  async confirmProduct(user: User, order: Order) {
    this.productOrderService.updateProductOrder(user.id, {
      status: "purchased",
    });
    user.setOrders([order]);
    const productorders = await this.productOrderService.getProductOrders({
      orderId: user.checkoutId,
    });

    const products = productorders
      .map((item: ProductOrder) => item.product?.name)
      .join(", ");

    await this.emailRepository.send(
      user.email,
      "Thanks for your purchase!",
      `You bought ${products}\n\nIt arrives ${order.delivery.eta}`
    );
  }
}
