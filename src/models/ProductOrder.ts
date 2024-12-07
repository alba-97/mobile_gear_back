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
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: "productorders" }
);

export default ProductOrder;
