import { DeliveryDto } from "../dto/delivery.dto";
import { Delivery } from "../models";

const createDelivery = async (data: DeliveryDto) => {
  return await Delivery.create(data);
};

export default { createDelivery };
