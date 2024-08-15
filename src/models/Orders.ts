import { Model, DataTypes } from "sequelize";
import db from "../db";
import { Delivery } from "../interfaces/Delivery";
import Users from "./Users";

class Orders extends Model {
  id: number;
  status: string;
  delivery: Delivery;
  setUsers: (user: Users | null) => void;
}

Orders.init(
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

export default Orders;
