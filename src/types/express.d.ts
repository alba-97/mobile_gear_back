import { UserRequest } from "src/interfaces/user";

declare module "express-serve-static-core" {
  interface Request {
    user: UserRequest;
  }
}
