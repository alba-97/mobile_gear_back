import { CreationAttributes } from "sequelize";
import { Delivery } from "../models";

const createDelivery = async (data: CreationAttributes<Delivery>) => {
  return await Delivery.create(data);
};

export default { createDelivery };
