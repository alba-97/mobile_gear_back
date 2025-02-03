import { CreationAttributes } from "sequelize";
import { Delivery } from "../models";
import DeliveryRepository from "../repositories/delivery.repository";

export default class DeliveryService {
  private deliveryRepository: DeliveryRepository;

  constructor({ deliveryRepository }: { deliveryRepository: DeliveryRepository }) {
    this.deliveryRepository = deliveryRepository;
  }

  async createDelivery(data: CreationAttributes<Delivery>) {
    return await this.deliveryRepository.createOne(data);
  }
}
