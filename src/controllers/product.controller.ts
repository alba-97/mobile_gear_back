import { Response } from "express";
import { UserRequest } from "../interfaces/UserRequest";
import productService from "../services/product.service";

export const listProducts = async (req: UserRequest, res: Response) => {
  try {
    const data = await productService.listProducts(req.query);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const discountedProducts = async (_: UserRequest, res: Response) => {
  try {
    const data = await productService.discountedProducts();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getProduct = async (req: UserRequest, res: Response) => {
  try {
    const data = await productService.getProduct(+req.params.id);
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const editProduct = async (req: UserRequest, res: Response) => {
  try {
    await productService.editProduct(+req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const addProduct = async (req: UserRequest, res: Response) => {
  try {
    const data = await productService.addProduct(req.body);
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteProduct = async (req: UserRequest, res: Response) => {
  try {
    await productService.deleteProduct(+req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};
