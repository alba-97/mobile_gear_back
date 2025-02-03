import { CreationAttributes, WhereOptions } from "sequelize";
import { Delivery } from "../models";
import { DeliveryQuery } from "../interfaces/query";
import minMaxFilter from "../utils/minMaxFilter";

export default class DeliveryRepository {
  async getAll(query: DeliveryQuery = {}) {
    const { type, minPrice, maxPrice, minEta, maxEta } = query;
    const where: WhereOptions<Delivery> = {};
    if (type) where.type = type;
    where.price = minMaxFilter(minPrice, maxPrice);
    where.eta = minMaxFilter(minEta, maxEta);

    const deliveries = await Delivery.findAll({ where });
    return deliveries;
  }

  async getOneById(id: number) {
    return await Delivery.findByPk(id);
  }

  async updateOneById(id: number, data: CreationAttributes<Delivery>) {
    return await Delivery.update(data, {
      where: { id },
    });
  }

  async createOne(data: CreationAttributes<Delivery>) {
    return await Delivery.create(data);
  }

  async deleteOneById(id: number) {
    return await Delivery.destroy({
      where: { id },
    });
  }
}
