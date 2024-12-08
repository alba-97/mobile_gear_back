import { Response } from "express";
import { UserRequest } from "../interfaces/UserRequest";
import categoryService from "../services/category.service";

export const listCategories = async (_: UserRequest, res: Response) => {
  try {
    const categories = await categoryService.listCategories();
    res.send(categories);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const addCategory = async (req: UserRequest, res: Response) => {
  try {
    const name = req.body.name.toLowerCase();
    const data = await categoryService.addCategory(name);
    if (!data) return res.sendStatus(409);
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const editCategory = async (req: UserRequest, res: Response) => {
  try {
    const name = req.body.name;
    await categoryService.editCategory(+req.params.id, name);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteCategory = async (req: UserRequest, res: Response) => {
  try {
    await categoryService.deleteCategory(+req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};
