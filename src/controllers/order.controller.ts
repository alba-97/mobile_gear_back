import { Request, Response } from "express";
import { route, POST, GET, before } from "awilix-router-core";
import OrderService from "../services/order.service";
import UserService from "../services/user.service";
import CartItemService from "../services/cart-item.service";
import { handleError } from "../utils/handleError";
import validateUser from "../middleware/validateUser";
import validateAdmin from "../middleware/validateAdmin";
import dotenv from "dotenv";

dotenv.config();

@route("/orders")
export default class OrderController {
  private userService: UserService;
  private cartItemService: CartItemService;
  private orderService: OrderService;

  constructor({
    userService,
    cartItemService,
    orderService,
  }: {
    userService: UserService;
    cartItemService: CartItemService;
    orderService: OrderService;
  }) {
    this.userService = userService;
    this.cartItemService = cartItemService;
    this.orderService = orderService;
  }

  @route("/payment-intents")
  @POST()
  @before([validateUser])
  async getPaymentIntent(req: Request, res: Response) {
    try {
      const paymentIntent = await this.orderService.getPaymentIntent(req.body);
      res.json(paymentIntent);
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
        const orders = await this.cartItemService.getCartItems({
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
      const cartItems = await this.cartItemService.getCartItems();
      res.send(cartItems);
    } catch (err) {
      return handleError(res, err);
    }
  }
}
