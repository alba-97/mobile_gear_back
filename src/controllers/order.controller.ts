import { Response } from "express";

import dotenv from "dotenv";
dotenv.config();

import userService from "../services/user.service";
import productOrderService from "../services/product-order.service";
import orderService from "../services/order.service";
import { UserRequest } from "../interfaces/UserRequest";
import { ProductOrder } from "../models";
import { HttpError } from "../utils/httpError";

export const confirmPurchase = async (req: UserRequest, res: Response) => {
  try {
    if (!req.user?.id) return res.sendStatus(401);

    const user = await userService.getUserById(req.user.id);
    if (!user) return res.sendStatus(404);

    const order = await orderService.getOrderById(user.checkoutId);
    if (!order) return res.sendStatus(404);

    if (order.status !== "checkout") return res.sendStatus(401);

    await orderService.confirmProduct(user, order);
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof HttpError)
      return res.status(err.status).send(err.message);
    if (err instanceof Error) res.status(500).send({ message: err.message });
  }
};

export const addToCheckout = async (req: UserRequest, res: Response) => {
  try {
    if (!req.user?.id) return res.sendStatus(401);
    await orderService.addToCheckout(req.user.id, req.body);
    res.sendStatus(201);
  } catch (err) {
    if (err instanceof HttpError)
      return res.status(err.status).send(err.message);
    if (err instanceof Error) res.status(500).send({ message: err.message });
  }
};

export const listCheckout = async (req: UserRequest, res: Response) => {
  try {
    if (!req.user?.id) return res.sendStatus(401);

    const user = await userService.getUserById(req.user.id);
    if (!user || !user.checkoutId) return res.sendStatus(404);

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
    if (err instanceof HttpError)
      return res.status(err.status).send(err.message);
    if (err instanceof Error) res.status(500).send({ message: err.message });
  }
};

export const purchaseHistory = async (req: UserRequest, res: Response) => {
  try {
    if (!req.user?.id) return res.sendStatus(401);
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
    if (err instanceof HttpError)
      return res.status(err.status).send(err.message);
    if (err instanceof Error) res.status(500).send({ message: err.message });
  }
};

export const listAllOrders = async (_: UserRequest, res: Response) => {
  try {
    const productOrders = await productOrderService.getProductOrders();
    res.send(productOrders);
  } catch (err) {
    if (err instanceof HttpError)
      return res.status(err.status).send(err.message);
    if (err instanceof Error) res.status(500).send({ message: err.message });
  }
};
