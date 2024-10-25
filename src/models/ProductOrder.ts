import { Model, DataTypes } from "sequelize";

import db from "../db";
import { Order } from "../interfaces/Order";
import { Product } from "../interfaces/Product";

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
