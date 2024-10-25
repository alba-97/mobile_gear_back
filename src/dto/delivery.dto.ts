import { InferCreationAttributes } from "sequelize";
import { Delivery } from "../models";

export type DeliveryDto = InferCreationAttributes<Delivery>;
