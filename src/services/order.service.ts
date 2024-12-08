import { CreationAttributes } from "sequelize";
import { Order, ProductOrder, User } from "../models";
import productOrderService from "./product-order.service";
import emailService from "./email.service";
import orderRepository from "../repositories/order.repository";

const getOrderById = async (id: number) => {
  return await orderRepository.getOneById(id);
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

export default { confirmProduct, getOrderById, createOrder };
