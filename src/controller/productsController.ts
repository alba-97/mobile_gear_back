// src/controllers/productController.ts

import { Response } from "express";
import { CustomRequest } from "../interfaces/CustomRequest";
import productsService from "../services/productsService";

export const listProducts = async (_: CustomRequest, res: Response) => {
  try {
    const data = await productsService.listProducts();
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const discountedProducts = async (_: CustomRequest, res: Response) => {
  try {
    const data = await productsService.discountedProducts();
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const getProduct = async (req: CustomRequest, res: Response) => {
  try {
    const data = await productsService.getProduct(Number(req.params.id));
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const editProduct = async (req: CustomRequest, res: Response) => {
  try {
    await productsService.editProduct(Number(req.params.id), req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const addProduct = async (req: CustomRequest, res: Response) => {
  try {
    const data = await productsService.addProduct(req.body);
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const deleteProduct = async (req: CustomRequest, res: Response) => {
  try {
    await productsService.deleteProduct(Number(req.params.id));
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};
