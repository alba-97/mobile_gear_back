import { Request, Response } from "express";
import { route, POST, GET, before } from "awilix-router-core";
import OrderService from "../services/order.service";
import UserService from "../services/user.service";
import ProductOrderService from "../services/product-order.service";
import { handleError } from "../utils/handleError";
import validateUser from "../middleware/validateUser";
import validateAdmin from "../middleware/validateAdmin";
import dotenv from "dotenv";
import { ProductOrder } from "../models";

dotenv.config();

@route("/orders")
export default class OrderController {
  private userService: UserService;
  private productOrderService: ProductOrderService;
  private orderService: OrderService;

  constructor({
    userService,
    productOrderService,
    orderService,
  }: {
    userService: UserService;
    productOrderService: ProductOrderService;
    orderService: OrderService;
  }) {
    this.userService = userService;
    this.productOrderService = productOrderService;
    this.orderService = orderService;
  }

  @route("/checkout")
  @POST()
  @before([validateUser])
  async addToCheckout(req: Request, res: Response) {
    try {
      await this.orderService.addToCheckout(req.user.id, req.body);
      res.sendStatus(201);
    } catch (err) {
      return handleError(res, err);
    }
  }

  @route("/checkout")
  @GET()
  @before([validateUser])
  async listCheckout(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.user.id);
      if (!user || !user.checkoutId) return res.sendStatus(404);

      const productOrders = await this.productOrderService.getProductOrders({
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
  }

  @route("/confirm")
  @POST()
  @before([validateUser])
  async confirmPurchase(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.user.id);
      if (!user) return res.sendStatus(404);

      const order = await this.orderService.getOrderById(user.checkoutId);
      if (!order) return res.sendStatus(404);

      if (order.status !== "checkout") return res.sendStatus(401);

      await this.orderService.confirmProduct(user, order);
      res.sendStatus(204);
    } catch (err) {
      return handleError(res, err);
    }
  }

  @route("/history")
  @GET()
  @before([validateUser])
  async purchaseHistory(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.user.id);
      if (user) {
        const orders = await this.productOrderService.getProductOrders({
          userId: user.id,
        });
        res.send(orders);
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      return handleError(res, err);
    }
  }

  @route("/")
  @GET()
  @before([validateUser, validateAdmin])
  async listAllOrders(_: Request, res: Response) {
    try {
      const productOrders = await this.productOrderService.getProductOrders();
      res.send(productOrders);
    } catch (err) {
      return handleError(res, err);
    }
  }
}
