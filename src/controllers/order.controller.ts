import { Response } from "express";
import { CustomRequest } from "../interfaces/CustomRequest";
import { ProductOrder } from "../interfaces/ProductOrder";

import dotenv from "dotenv";
dotenv.config();

import userService from "../services/user.service";
import productOrderService from "../services/product-order.service";
import orderService from "../services/order.service";
import deliveryService from "../services/delivery.service";
import emailService from "../services/email.service";

export const confirmPurchase = async (req: CustomRequest, res: Response) => {
  try {
    const user = await userService.getUserById(req.user?.id);
    const order = await orderService.getOrderById(user?.checkoutId);
    if (order?.status == "checkout") {
      productOrderService.updateOrder(
        { status: "purchased" },
        { where: { id: order.id } }
      );
      user?.setOrders(order);
      const productorders = await productOrderService.getProductOrders({
        orderId: user?.checkoutId,
      });

      const products = productorders
        .map((item: ProductOrder) => item.product.name)
        .join(", ");
      let eta = order.delivery.eta;

      await emailService.sendPurchaseEmail(products, eta, user?.email);

      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const addToCheckout = async (req: CustomRequest, res: Response) => {
  try {
    const user = await userService.getUserById(req.user?.id);
    const delivery = await deliveryService.createDelivery();
    const order = await orderService.createOrder({
      status: "checkout",
      deliveryId: delivery.id,
    });
    order.setUsers(user);

    const { data } = req.body;
    for (let i = 0; i < data.length; i++) {
      await productOrderService.createOrder({
        orderId: order.id,
        productId: data[i].id,
        userId: user?.id,
        qty: data[i].quantity,
      });
    }

    await userService.updateUser({ checkoutId: order.id }, { id: user?.id });

    res.sendStatus(201);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const listCheckout = async (req: CustomRequest, res: Response) => {
  try {
    const user = await userService.getUserById(req.user?.id);
    if (user && user.checkoutId) {
      const productOrders = await productOrderService.getProductOrders({
        orderId: user.checkoutId,
      });
      const total = productOrders.reduce(
        (acc: number, item: ProductOrder) =>
          acc + item.product.price * item.qty,
        0
      );
      res.send({ data: productOrders, total });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

export const purchaseHistory = async (req: CustomRequest, res: Response) => {
  try {
    const user = await userService.getUserById(req.user?.id);
    if (user) {
      const orders = await productOrderService.getProductOrders({
        userId: user.id,
      });
      res.send(orders);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

export const listAllOrders = async (req: CustomRequest, res: Response) => {
  if (req.user?.is_admin) {
    const productOrders = await productOrderService.getProductOrders();
    res.send(productOrders);
  } else {
    res.sendStatus(403);
  }
};
