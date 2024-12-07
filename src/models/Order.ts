import { Model, DataTypes, HasManySetAssociationsMixin } from "sequelize";
import db from "../db";
import User from "./User";
import Delivery from "./Delivery";

class Order extends Model {
  id!: number;
  status!: string;
  delivery!: Delivery;
  setUsers!: HasManySetAssociationsMixin<User, number>;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
