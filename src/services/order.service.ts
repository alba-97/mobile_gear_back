import { CreationAttributes } from "sequelize";
import { Delivery, Order, ProductOrder, User } from "../models";
import productOrderService from "./product-order.service";
import emailService from "./email.service";

const getOrderById = async (id?: number) => {
  return await Order.findByPk(id, {
    include: Delivery,
  });
};

const createOrder = async (data: CreationAttributes<Order>) => {
  return await Order.create(data);
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
