import { Response } from "express";
import { UserRequest } from "../interfaces/UserRequest";
import userService from "../services/user.service";
import authService from "../services/auth.service";

export const login = async (req: UserRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.send(result);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "Unauthorized") {
        res.status(401).send({ message: "Invalid email or password" });
      } else {
        res.status(500).send({ message: "Internal server error" });
      }
    }
  }
};

export const signup = async (req: UserRequest, res: Response) => {
  try {
    await userService.createUser(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const logout = (_: UserRequest, res: Response) => {
  res.sendStatus(204);
};

export const me = async (req: UserRequest, res: Response) => {
  const user = await userService.getUserById(Number(req.user?.id));
  res.send(user);
};

export const listUsers = async (req: UserRequest, res: Response) => {
  try {
    const users = await userService.listUsers();
    res.send(users);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const switchPrivileges = async (req: UserRequest, res: Response) => {
  try {
    await userService.switchPrivileges(Number(req.params.id));
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const removeUser = async (req: UserRequest, res: Response) => {
  try {
    await userService.removeUser(Number(req.params.id));
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};
