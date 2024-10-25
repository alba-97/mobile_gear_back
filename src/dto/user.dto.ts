import { InferCreationAttributes } from "sequelize";
import { User } from "../models";

export type UserDto = InferCreationAttributes<User>;
