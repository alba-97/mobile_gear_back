import { Request } from "express";
import { User } from "../models";

export interface UserRequest extends Request {
  user?: User;
}
