import { Request, Response, NextFunction } from "express";

const validateAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.isAdmin) {
    return next();
  } else {
    return res.sendStatus(403);
  }
};

export default validateAdmin;
