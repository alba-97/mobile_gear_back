import { Request, Response } from "express";
import productService from "../services/product.service";
import { handleError } from "../utils/handleError";

export const listProducts = async (req: Request, res: Response) => {
  try {
    const data = await productService.listProducts(req.query);
    res.status(200).send(data);
  } catch (err) {
    if (err instanceof Error) res.status(500).send({ message: err.message });
  }
};

export const discountedProducts = async (_: Request, res: Response) => {
  try {
    const data = await productService.discountedProducts();
    res.send(data);
  } catch (err) {
    return handleError(res, err);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const data = await productService.getProduct(+req.params.id);
    res.send(data);
  } catch (err) {
    return handleError(res, err);
  }
};

export const editProduct = async (req: Request, res: Response) => {
  try {
    await productService.editProduct(+req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    return handleError(res, err);
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const data = await productService.addProduct(req.body);
    res.send(data);
  } catch (err) {
    return handleError(res, err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(+req.params.id);
    res.sendStatus(200);
  } catch (err) {
    return handleError(res, err);
  }
};
