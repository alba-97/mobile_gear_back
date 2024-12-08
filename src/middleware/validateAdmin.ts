import { Request, Response, NextFunction } from "express";
import { UserRequest } from "../interfaces/UserRequest";

const validateAdmin = (req: UserRequest, res: Response, next: NextFunction) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    res.sendStatus(403);
  }
};

export default validateAdmin;
