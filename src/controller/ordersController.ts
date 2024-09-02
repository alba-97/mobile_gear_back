import { Response } from "express";
import { CustomRequest } from "../interfaces/CustomRequest";
import { ProductOrder } from "../interfaces/ProductOrder";

import dotenv from "dotenv";
dotenv.config();

import transporter from "../mailTransporter";
import { Deliverys, Orders, Products, Users } from "../models";
import ProductOrders from "../models/ProductOrders";
import usersService from "../services/usersService";
import productOrdersService from "../services/productOrdersService";
import ordersService from "../services/ordersService";

export const confirmPurchase = async (req: CustomRequest, res: Response) => {
  try {
    const user = await usersService.getUserById(req.user?.id);
    const order = await ordersService.getOrderById(user?.checkoutId);
    if (order?.status == "checkout") {
      productOrdersService.updateOrder(
        { status: "purchased" },
        { where: { id: order.id } }
      );
      user?.setOrders(order);
      const productorders = await productOrdersService.getProductOrders({
        orderId: user?.checkoutId,
      });

      const products = productorders
        .map((item: ProductOrder) => item.product.name)
        .join(", ");
      let eta = order.delivery.eta;

      const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];

      const etaDay = new Date(
        `${days[eta.getDay()]} ${eta.getDate().toString()}`
      );

      const to = user?.email;
      const subject = "Thanks for your purchase!";
      const text = `You bought ${products}\n\nIt arrives ${etaDay}`;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
      };

      await transporter.sendMail(mailOptions);
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
    const user = await usersService.getUserById(req.user?.id);
    const delivery = await Deliverys.create();
    const order = await Orders.create({
      status: "checkout",
      deliveryId: delivery.id,
    });
    order.setUsers(user);

    const { data } = req.body;
    for (let i = 0; i < data.length; i++) {
      await ProductOrders.create({
        orderId: order.id,
        productId: data[i].id,
        userId: user?.id,
        qty: data[i].quantity,
      });
    }

    await usersService.updateUser({ checkoutId: order.id }, { id: user?.id });

    res.sendStatus(201);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const listCheckout = async (req: CustomRequest, res: Response) => {
  try {
    const user = await Users.findByPk(req.user?.id);
    if (user && user.checkoutId) {
      const productOrders = await ProductOrders.findAll({
        where: { orderId: user.checkoutId },
        include: [Products],
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
    const user = await Users.findByPk(req.user?.id, { include: Orders });
    if (user) {
      const orders = await productOrdersService.getProductOrders({
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
    const productOrders = await productOrdersService.getProductOrders();
    res.send(productOrders);
  } else {
    res.sendStatus(403);
  }
};
