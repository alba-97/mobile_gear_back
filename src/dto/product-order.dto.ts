import { InferCreationAttributes } from "sequelize";
import { ProductOrder } from "../models";

export type ProductOrderDto = InferCreationAttributes<ProductOrder>;
