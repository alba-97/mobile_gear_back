import { InferCreationAttributes } from "sequelize";
import { Category } from "../models";

export type CategoryDto = InferCreationAttributes<Category>;
