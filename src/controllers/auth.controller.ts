import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";
import handleError from "../utils/handleError";

const getSafeUserData = (user: any) => {
  const userData = user.get({ plain: true });
  const { password, ...safeUserData } = userData;
  return safeUserData;
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData = req.body;
    const user = await authService.register(userData);
    res.status(201).json(getSafeUserData(user));
  } catch (error) {
    handleError(error, res, next);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    handleError(error, res, next);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await authService.getProfile(req.user.id);
    res.json(getSafeUserData(user));
  } catch (error) {
    handleError(error, res, next);
  }
};
