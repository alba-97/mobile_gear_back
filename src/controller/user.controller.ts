import { Response } from "express";
import { CustomRequest } from "../interfaces/CustomRequest";
import userService from "../services/user.service";
import authService from "../services/auth.service";

export const login = async (req: CustomRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.send(result);
  } catch (err) {
    res.status(401).send(err);
  }
};

export const signup = async (req: CustomRequest, res: Response) => {
  try {
    await userService.createUser(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const logout = (_: CustomRequest, res: Response) => {
  res.sendStatus(204);
};

export const me = async (req: CustomRequest, res: Response) => {
  const user = await userService.getUserById(Number(req.user?.id));
  res.send(user);
};

export const listUsers = async (req: CustomRequest, res: Response) => {
  try {
    const users = await userService.listUsers();
    res.send(users);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const switchPrivileges = async (req: CustomRequest, res: Response) => {
  try {
    await userService.switchPrivileges(Number(req.params.id));
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const removeUser = async (req: CustomRequest, res: Response) => {
  try {
    await userService.removeUser(Number(req.params.id));
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};
