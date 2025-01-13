import { Request, Response } from "express";
import categoryService from "../services/category.service";
import { handleError } from "../utils/handleError";

export const listCategories = async (_: Request, res: Response) => {
  try {
    const categories = await categoryService.listCategories();
    res.send(categories);
  } catch (err) {
    return handleError(res, err);
  }
};

export const addCategory = async (req: Request, res: Response) => {
  try {
    const name = req.body.name.toLowerCase();
    const data = await categoryService.addCategory(name);
    res.send(data);
  } catch (err) {
    return handleError(res, err);
  }
};

export const editCategory = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    await categoryService.editCategory(+req.params.id, name);
    res.sendStatus(200);
  } catch (err) {
    return handleError(res, err);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await categoryService.deleteCategory(+req.params.id);
    res.sendStatus(200);
  } catch (err) {
    return handleError(res, err);
  }
};
