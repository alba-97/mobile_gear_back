import { Model, DataTypes } from "sequelize";
import db from "../db";
import Product from "./Product";
import Order from "./Order";
import User from "./User";

class CartItem extends Model {
  qty: number;
  orderId: number;
  order?: Order;
  productId: number;
  product?: Product;
  userId: number;
  user?: User;
}

CartItem.init(
  {
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Quantity must be an integer" },
        min: { args: [1], msg: "Quantity must be at least 1" },
      },
    },
  },
  { sequelize: db, modelName: "cartitems" }
);

export default CartItem;
