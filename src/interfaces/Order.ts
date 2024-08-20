import { Delivery } from "./Delivery";

export interface Order {
  id: number;
  status: string;
  total_value: number;
  userId: number;
  delivery: Delivery;
  createdAt: Date;
  updatedAt: Date;
}
