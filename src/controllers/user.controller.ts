import { Response } from "express";
import { UserRequest } from "../interfaces/UserRequest";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import { handleError } from "../utils/handleError";

export const login = async (req: UserRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.send(result);
  } catch (err) {
    return handleError(res, err);
  }
};

export const signup = async (req: UserRequest, res: Response) => {
  try {
    await userService.createUser(req.body);
    res.sendStatus(200);
  } catch (err) {
    return handleError(res, err);
  }
};

export const me = async (req: UserRequest, res: Response) => {
  try {
    if (!req.user?.id) return res.sendStatus(401);
    const user = await userService.getUserById(req.user.id);
    res.send(user);
  } catch (err) {
    return handleError(res, err);
  }
};

export const listUsers = async (req: UserRequest, res: Response) => {
  try {
    const users = await userService.listUsers();
    res.send(users);
  } catch (err) {
    return handleError(res, err);
  }
};

export const switchPrivileges = async (req: UserRequest, res: Response) => {
  try {
    await userService.switchPrivileges(Number(req.params.id));
    res.sendStatus(200);
  } catch (err) {
    return handleError(res, err);
  }
};

export const removeUser = async (req: UserRequest, res: Response) => {
  try {
    await userService.removeUser(Number(req.params.id));
    res.sendStatus(200);
  } catch (err) {
    return handleError(res, err);
  }
};
