import { CreationAttributes } from "sequelize";
import { Delivery } from "../models";
import deliveryRepository from "../repositories/delivery.repository";

const createDelivery = async (data: CreationAttributes<Delivery>) => {
  return await deliveryRepository.createOne(data);
};

export default { createDelivery };
