import { Response } from "express";
import { CustomRequest } from "../interfaces/CustomRequest";
import { Op } from "sequelize";
import { Brands, Categories, Products } from "../models";

export const listProducts = async (_: CustomRequest, res: Response) => {
  try {
    const data = await Products.findAll();
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const discountedProducts = async (_: CustomRequest, res: Response) => {
  try {
    const data = await Products.findAll({
      where: {
        discount: { [Op.gt]: 15 },
      },
      include: [Categories, Brands],
    });
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const getProduct = async (req: CustomRequest, res: Response) => {
  try {
    const data = await Products.findByPk(Number(req.params.id), {
      include: [Brands, Categories],
    });
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const editProduct = async (req: CustomRequest, res: Response) => {
  try {
    if (req.user?.is_admin) {
      const data = await Products.update(req.body, {
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

export const addProduct = async (req: CustomRequest, res: Response) => {
  try {
    if (req.user?.is_admin) {
      const data = await Products.create(req.body);
      res.send(data);
    } else {
      res.status(403).send({ message: "Acceso denegado" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

export const deleteProduct = async (req: CustomRequest, res: Response) => {
  try {
    if (req.user?.is_admin) {
      await Products.destroy({
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
