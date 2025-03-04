import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin rights required." });
  }
};
