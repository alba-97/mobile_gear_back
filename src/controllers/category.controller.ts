import { Response } from "express";
import { UserRequest } from "../interfaces/UserRequest";
import categoryService from "../services/category.service";
import { HttpError } from "../utils/httpError";

export const listCategories = async (_: UserRequest, res: Response) => {
  try {
    const categories = await categoryService.listCategories();
    res.send(categories);
  } catch (err) {
    if (err instanceof HttpError)
      return res.status(err.status).send(err.message);
    res.status(500).send(err);
  }
};

export const addCategory = async (req: UserRequest, res: Response) => {
  try {
    const name = req.body.name.toLowerCase();
    const data = await categoryService.addCategory(name);
    res.send(data);
  } catch (err) {
    if (err instanceof HttpError)
      return res.status(err.status).send(err.message);
    res.status(500).send(err);
  }
};

export const editCategory = async (req: UserRequest, res: Response) => {
  try {
    const name = req.body.name;
    await categoryService.editCategory(+req.params.id, name);
    res.sendStatus(200);
  } catch (err) {
    if (err instanceof HttpError)
      return res.status(err.status).send(err.message);
    res.status(500).send(err);
  }
};

export const deleteCategory = async (req: UserRequest, res: Response) => {
  try {
    await categoryService.deleteCategory(+req.params.id);
    res.sendStatus(200);
  } catch (err) {
    if (err instanceof HttpError)
      return res.status(err.status).send(err.message);
    res.status(500).send(err);
  }
};
