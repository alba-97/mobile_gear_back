import { Model, DataTypes } from "sequelize";
import db from "../db";
import { Delivery } from "../interfaces/Delivery";
import User from "./User";

class Order extends Model {
  id: number;
  status: string;
  delivery: Delivery;
  setUsers: (user: User | null) => void;
}

Order.init(
  {
    total_value: {
      type: DataTypes.FLOAT,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: "orders" }
);

export default Order;
