import { NextFunction, Response } from "express";
import { HttpError } from "./errors";

export default (error: unknown, res: Response, next: NextFunction) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
  next(error);
};
