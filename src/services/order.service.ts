import { CreationAttributes } from "sequelize";
import { Order, ProductOrder, User } from "../models";
import productOrderService from "./product-order.service";
import emailService from "./email.service";
import orderRepository from "../repositories/order.repository";
import userRepository from "../repositories/user.repository";
import deliveryRepository from "../repositories/delivery.repository";
import productOrderRepository from "../repositories/product-order.repository";
import { HttpError } from "../utils/httpError";

const getOrderById = async (id: number) => {
  return await orderRepository.getOneById(id);
};

const addToCheckout = async (
  userId: number,
  data: CreationAttributes<Order>
) => {
  const user = await userRepository.getOneById(userId);
  if (!user) throw new HttpError(404, "User not found");

  const delivery = await deliveryRepository.createOne(data);
  const order = await orderRepository.createOne({
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
  await productOrderRepository.create(productOrders);
  await userRepository.updateOneById(userId, { checkoutId: order.id });
};

const createOrder = async (data: CreationAttributes<Order>) => {
  return await orderRepository.createOne(data);
};

const confirmProduct = async (user: User, order: Order) => {
  productOrderService.updateProductOrder(user.id, {
    status: "purchased",
  });
  user.setOrders([order]);
  const productorders = await productOrderService.getProductOrders({
    orderId: user.checkoutId,
  });

  const products = productorders
    .map((item: ProductOrder) => item.product?.name)
    .join(", ");
  let eta = order.delivery.eta;

  await emailService.sendPurchaseEmail(products, eta, user.email);
};

export default { confirmProduct, getOrderById, createOrder, addToCheckout };
