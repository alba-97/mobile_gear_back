import { Model, DataTypes } from "sequelize";
import db from "../db";
import Product from "./Product";
import Order from "./Order";

class ProductOrder extends Model {
  qty: number;
  orderId: number;
  order?: Order;
  productId: number;
  product?: Product;
  userId: number;
  status: string;
}

ProductOrder.init(
  {
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Quantity must be an integer" },
        min: { args: [1], msg: "Quantity must be at least 1" },
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["pending", "purchased", "shipped", "delivered", "cancelled"]],
          msg: "Status must be one of: pending, purchased, shipped, delivered, or cancelled",
        },
      },
    },
  },
  { sequelize: db, modelName: "productorders" }
);

export default ProductOrder;
