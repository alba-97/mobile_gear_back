import { InferCreationAttributes } from "sequelize";
import { Order } from "../models";

export type OrderDto = InferCreationAttributes<Order>;
