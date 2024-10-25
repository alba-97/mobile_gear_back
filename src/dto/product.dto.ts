import { InferCreationAttributes } from "sequelize";
import { Product } from "../models";

export type ProductDto = InferCreationAttributes<Product>;
