import { Model, DataTypes } from "sequelize";

import db from "../db";
import { Product } from "../interfaces/Product";
import { Order } from "../interfaces/Order";

class ProductOrders extends Model {
  id: number;
  qty: number;
  order: Order;
  product: Product;
}

ProductOrders.init(
  {
    qty: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize: db, modelName: "productorders" }
);

export default ProductOrders;
