import { Order } from "./Order";
import { Product } from "./Product";

export interface ProductOrder {
  id?: number;
  qty: number;
  order?: Order;
  product?: Product;
}

export interface IProductOrderQuery {
  qty?: number;
  username?: string;
  productName?: string;
  orderId?: number;
  userId?: number;
}
