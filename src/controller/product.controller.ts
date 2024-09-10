import { Response } from "express";
import { CustomRequest } from "../interfaces/CustomRequest";
import productService from "../services/product.service";

export const listProducts = async (req: CustomRequest, res: Response) => {
  try {
    const data = await productService.listProducts(req.query);
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const discountedProducts = async (_: CustomRequest, res: Response) => {
  try {
    const data = await productService.discountedProducts();
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const getProduct = async (req: CustomRequest, res: Response) => {
  try {
    const data = await productService.getProduct(Number(req.params.id));
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const editProduct = async (req: CustomRequest, res: Response) => {
  try {
    await productService.editProduct(Number(req.params.id), req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const addProduct = async (req: CustomRequest, res: Response) => {
  try {
    const data = await productService.addProduct(req.body);
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const deleteProduct = async (req: CustomRequest, res: Response) => {
  try {
    await productService.deleteProduct(Number(req.params.id));
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};
