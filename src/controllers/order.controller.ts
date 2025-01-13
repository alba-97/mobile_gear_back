import { Response, Request } from "express";
import dotenv from "dotenv";
import userService from "../services/user.service";
import productOrderService from "../services/product-order.service";
import orderService from "../services/order.service";
import { ProductOrder } from "../models";
import { handleError } from "../utils/handleError";

dotenv.config();

export const confirmPurchase = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.user.id);
    if (!user) return res.sendStatus(404);

    const order = await orderService.getOrderById(user.checkoutId);
    if (!order) return res.sendStatus(404);

    if (order.status !== "checkout") return res.sendStatus(401);

    await orderService.confirmProduct(user, order);
    res.sendStatus(204);
  } catch (err) {
    return handleError(res, err);
  }
};

export const addToCheckout = async (req: Request, res: Response) => {
  try {
    await orderService.addToCheckout(req.user.id, req.body);
    res.sendStatus(201);
  } catch (err) {
    return handleError(res, err);
  }
};

export const listCheckout = async (req: Request, res: Response) => {
  try {
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
    return handleError(res, err);
  }
};

export const purchaseHistory = async (req: Request, res: Response) => {
  try {
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
    return handleError(res, err);
  }
};

export const listAllOrders = async (_: Request, res: Response) => {
  try {
    const productOrders = await productOrderService.getProductOrders();
    res.send(productOrders);
  } catch (err) {
    return handleError(res, err);
  }
};
