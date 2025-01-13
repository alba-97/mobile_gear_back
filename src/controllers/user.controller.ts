import { Request, Response } from "express";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import { handleError } from "../utils/handleError";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.send(result);
  } catch (err) {
    return handleError(res, err);
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    await userService.createUser(req.body);
    res.sendStatus(200);
  } catch (err) {
    return handleError(res, err);
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.send(user);
  } catch (err) {
    return handleError(res, err);
  }
};

export const listUsers = async (_: Request, res: Response) => {
  try {
    const users = await userService.listUsers();
    res.send(users);
  } catch (err) {
    return handleError(res, err);
  }
};

export const switchPrivileges = async (req: Request, res: Response) => {
  try {
    await userService.switchPrivileges(Number(req.params.id));
    res.sendStatus(200);
  } catch (err) {
    return handleError(res, err);
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    await userService.removeUser(Number(req.params.id));
    res.sendStatus(200);
  } catch (err) {
    return handleError(res, err);
  }
};
