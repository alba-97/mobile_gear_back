import { Order } from "./Order";
import { Product } from "./Product";

export interface ProductOrder {
  id: number;
  qty: number;
  order: Order;
  product: Product;
}
