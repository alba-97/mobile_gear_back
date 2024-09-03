import { Response } from "express";
import { CustomRequest } from "../interfaces/CustomRequest";
import categoryService from "../services/category.service";

export const listCategories = async (_: CustomRequest, res: Response) => {
  try {
    const categories = await categoryService.listCategories();
    res.send(categories);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const addCategory = async (req: CustomRequest, res: Response) => {
  try {
    const name = req.body.name.toLowerCase();
    const data = await categoryService.addCategory(name);
    if (data[1]) {
      res.send(data[0]);
    } else {
      res.sendStatus(409);
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

export const editCategory = async (req: CustomRequest, res: Response) => {
  try {
    const name = req.body.name.toLowerCase();
    await categoryService.editCategory(Number(req.params.id), name);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const deleteCategory = async (req: CustomRequest, res: Response) => {
  try {
    await categoryService.deleteCategory(Number(req.params.id));
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};
