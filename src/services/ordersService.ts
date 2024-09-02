import { Deliverys, Orders } from "../models";

const getOrderById = async (id?: number) => {
  return await Orders.findByPk(id, {
    include: Deliverys,
  });
};

export default { getOrderById };
