import { Response } from "express";
import { CustomRequest } from "../interfaces/CustomRequest";
import { Users } from "../models";

import { generateToken } from "../config/tokens";

export const login = async (req: CustomRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: { email },
    });
    if (!user) return res.sendStatus(401);
    const isValid = await user.validatePassword(password);
    if (!isValid) return res.sendStatus(401);

    const payload = {
      id: user.id,
      email: user.email,
      password: user.password,
      is_admin: user.is_admin,
    };

    const token = generateToken(payload);
    res.send({ user, token });
  } catch (err) {
    res.status(404).send(err);
  }
};

export const signup = async (req: CustomRequest, res: Response) => {
  try {
    await Users.create(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const logout = (_: CustomRequest, res: Response) => {
  res.sendStatus(204);
};

export const me = async (req: CustomRequest, res: Response) => {
  const user = await Users.findOne({
    where: { id: Number(req.user?.id) },
    attributes: { exclude: ["password", "salt"] },
  });
  res.send(user);
};

export const listUsers = async (req: CustomRequest, res: Response) => {
  try {
    if (req.user?.is_admin) {
      const users = await Users.findAll({
        attributes: { exclude: ["password", "salt"] },
      });
      res.send(users);
    } else {
      res.status(403).json({ mensaje: "Acceso denegado" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

export const switchPrivileges = async (req: CustomRequest, res: Response) => {
  try {
    if (req.user?.is_admin && Number(req.params.id) != req.user.id) {
      const user = await Users.findByPk(Number(req.params.id));
      await Users.update(
        { is_admin: !user?.is_admin },
        { where: { id: user?.id } }
      );
      res.sendStatus(200);
    } else {
      res.status(403).json({ mensaje: "Acceso denegado" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

export const removeUser = async (req: CustomRequest, res: Response) => {
  try {
    if (req.user?.is_admin) {
      await Users.destroy({ where: { id: Number(req.params.id) } });
      res.sendStatus(200);
    } else {
      res.status(403).json({ mensaje: "Acceso denegado" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};
