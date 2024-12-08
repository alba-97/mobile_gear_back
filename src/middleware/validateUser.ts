import { validateToken } from "../config/tokens";
import { Response, NextFunction } from "express";
import { UserRequest } from "../interfaces/UserRequest";

function validateUser(req: UserRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (token) {
    const result = validateToken(token);
    if (typeof result === "string") return res.sendStatus(401);
    req.user = result.payload;
    if (result.payload) return next();
  } else {
    res.sendStatus(401);
  }
}

export default validateUser;
