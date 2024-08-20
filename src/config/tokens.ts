import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { User } from "../interfaces/User";

const secret = process.env.SECRET ?? "";

export const generateToken = (payload: User) => {
  const token = jwt.sign({ payload }, secret, {
    expiresIn: "2h",
  });

  return token ?? "";
};

export const validateToken = (token: string) => {
  return jwt.verify(token, secret);
};
