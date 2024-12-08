import { Response } from "express";

import dotenv from "dotenv";
dotenv.config();

import userService from "../services/user.service";
import productOrderService from "../services/product-order.service";
import orderService from "../services/order.service";
import deliveryService from "../services/delivery.service";
import { UserRequest } from "../interfaces/UserRequest";
import { ProductOrder } from "../models";
import { CreationAttributes } from "sequelize";

export const confirmPurchase = async (req: UserRequest, res: Response) => {
  try {
    const user = await userService.getUserById(req.user?.id);
    if (!user) return res.sendStatus(404);

    const order = await orderService.getOrderById(user.checkoutId);
    if (!order) return res.sendStatus(404);

    if (order.status !== "checkout") return res.sendStatus(401);

    await orderService.confirmProduct(user, order);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const addToCheckout = async (req: UserRequest, res: Response) => {
  try {
    const user = await userService.getUserById(req.user?.id);
    if (!user) return;
    const delivery = await deliveryService.createDelivery(req.body);
    const order = await orderService.createOrder({
      status: "checkout",
      delivery: delivery,
    });
    if (!order.id) return;
    order.setUsers([user]);

    const { data } = req.body;
    const productOrders = data.map((item: { id: number; quantity: number }) => {
      return {
        orderId: order.id,
        productId: item.id,
        userId: user.id,
        qty: item.quantity,
        status: "checkout",
      };
    });
    await productOrderService.createProductOrder(productOrders);
    await userService.updateUser(user?.id, { checkoutId: order.id });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const listCheckout = async (req: UserRequest, res: Response) => {
  try {
    const user = await userService.getUserById(req.user?.id);
    if (!user || !user.checkoutId) return res.sendStatus(401);

    const productOrders = await productOrderService.getProductOrders({
      orderId: user.checkoutId,
    });
    const total = productOrders.reduce(
      (acc: number, item: ProductOrder) =>
        acc + (item.product?.price ?? 0) * item.qty,
      0
    );
    res.send({ data: productOrders, total });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const purchaseHistory = async (req: UserRequest, res: Response) => {
  try {
    if (!req.user?.id) return;
    const user = await userService.getUserById(req.user.id);
    if (user) {
      const orders = await productOrderService.getProductOrders({
        userId: user.id,
      });
      res.send(orders);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const listAllOrders = async (req: UserRequest, res: Response) => {
  const productOrders = await productOrderService.getProductOrders();
  res.send(productOrders);
};
