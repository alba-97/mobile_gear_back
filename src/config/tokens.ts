import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models";
dotenv.config();

const secret = process.env.JWT_SECRET ?? "";

export const generateToken = (payload: User) => {
  const token = jwt.sign({ payload }, secret, {
    expiresIn: "2h",
  });
  return token ?? "";
};

export const validateToken = (token: string) => {
  return jwt.verify(token, secret);
};
