import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../interfaces/CustomRequest";

const validateAdmin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.is_admin) {
    next();
  } else {
    res.sendStatus(403);
  }
};

export default validateAdmin;
