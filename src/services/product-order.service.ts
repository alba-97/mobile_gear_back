import { ProductOrderDto } from "../dto/product-order.dto";
import productOrderRepository from "../repositories/product-order.repository";
import { IProductOrderQuery } from "../interfaces/ProductOrder";

const getProductOrders = async (where: IProductOrderQuery) => {
  return await productOrderRepository.findAll(where);
};

const createProductOrder = async (data: ProductOrderDto) => {
  return await productOrderRepository.create(data);
};

const updateProductOrder = async (
  id: number,
  data: Partial<ProductOrderDto>
) => {
  return await productOrderRepository.updateOneById(id, data);
};

const deleteProductOrder = async (id: number) => {
  return await productOrderRepository.deleteOneById(id);
};

export default {
  getProductOrders,
  createProductOrder,
  updateProductOrder,
  deleteProductOrder,
};
