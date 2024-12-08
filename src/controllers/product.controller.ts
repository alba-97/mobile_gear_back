import { Response } from "express";
import { UserRequest } from "../interfaces/UserRequest";
import productService from "../services/product.service";
import { HttpError } from "../utils/httpError";

export const listProducts = async (req: UserRequest, res: Response) => {
  try {
    const data = await productService.listProducts(req.query);
    res.status(200).send(data);
  } catch (err) {
    if (err instanceof Error) res.status(500).send({ message: err.message });
  }
};

export const discountedProducts = async (_: UserRequest, res: Response) => {
  try {
    const data = await productService.discountedProducts();
    res.send(data);
  } catch (err) {
    if (err instanceof HttpError)
      return res.status(err.status).send(err.message);
    if (err instanceof Error) res.status(500).send({ message: err.message });
  }
};

export const getProduct = async (req: UserRequest, res: Response) => {
  try {
    const data = await productService.getProduct(+req.params.id);
    res.send(data);
  } catch (err) {
    if (err instanceof HttpError)
      return res.status(err.status).send(err.message);
    if (err instanceof Error) res.status(500).send({ message: err.message });
  }
};

export const editProduct = async (req: UserRequest, res: Response) => {
  try {
    await productService.editProduct(+req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    if (err instanceof HttpError)
      return res.status(err.status).send(err.message);
    if (err instanceof Error) res.status(500).send({ message: err.message });
  }
};

export const addProduct = async (req: UserRequest, res: Response) => {
  try {
    const data = await productService.addProduct(req.body);
    res.send(data);
  } catch (err) {
    if (err instanceof HttpError)
      return res.status(err.status).send(err.message);
    if (err instanceof Error) res.status(500).send({ message: err.message });
  }
};

export const deleteProduct = async (req: UserRequest, res: Response) => {
  try {
    await productService.deleteProduct(+req.params.id);
    res.sendStatus(200);
  } catch (err) {
    if (err instanceof HttpError)
      return res.status(err.status).send(err.message);
    if (err instanceof Error) res.status(500).send({ message: err.message });
  }
};