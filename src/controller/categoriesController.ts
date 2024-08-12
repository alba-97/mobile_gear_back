import { Response } from "express";
import { CustomRequest } from "../interfaces/CustomRequest";
import { Categories } from "../models/Categories";
import { Products } from "../models/Products";

export const listCategories = async (_: CustomRequest, res: Response) => {
  try {
    const categories = await Categories.findAll();
    res.send(categories);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const addCategory = async (req: CustomRequest, res: Response) => {
  try {
    if (req.user?.is_admin) {
      const name = req.body.name.toLowerCase();
      const data = await Categories.findOrCreate({ where: { name } });
      if (data[1]) {
        res.send(data[0]);
      } else {
        res.status(409).send({ message: "Dato existente" });
      }
    } else {
      res.status(403).send({ message: "Acceso denegado" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

export const editCategory = async (req: CustomRequest, res: Response) => {
  try {
    if (req.user?.is_admin) {
      const name = req.body.name.toLowerCase();
      await Categories.update(
        { name },
        {
          where: { id: Number(req.params.id) },
        }
      );
      res.sendStatus(200);
    } else {
      res.status(403).send({ message: "Acceso denegado" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

export const deleteCategory = async (req: CustomRequest, res: Response) => {
  try {
    if (req.user?.is_admin) {
      await Products.update(
        { categoryId: 1 },
        { where: { categoryId: Number(req.params.id) } }
      );

      await Categories.destroy({
        where: { id: Number(req.params.id) },
      });

      res.sendStatus(200);
    } else {
      res.status(403).send({ message: "Acceso denegado" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};
