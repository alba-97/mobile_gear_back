import { Model, DataTypes, HasManySetAssociationsMixin } from "sequelize";
import db from "../db";
import User from "./User";
import Delivery from "./Delivery";

class Order extends Model {
  id: number;
  status: string;
  delivery: Delivery;
  setUsers: HasManySetAssociationsMixin<User, number>;
}

Order.init(
  {
    total_value: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: { msg: "Total value must be a valid number" },
        min: { args: [0], msg: "Total value cannot be negative" },
      },
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [
            [
              "pending",
              "checkout",
              "purchased",
              "shipped",
              "delivered",
              "cancelled",
            ],
          ],
          msg: "Status must be one of: pending, checkout, purchased, shipped, delivered, or cancelled",
        },
      },
    },
  },
  { sequelize: db, modelName: "orders" }
);

export default Order;
