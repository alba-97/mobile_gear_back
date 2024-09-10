import { Deliverys } from "../models";

const createDelivery = async (data?: any) => {
  return await Deliverys.create(data);
};

export default { createDelivery };
