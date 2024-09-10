import { Model, DataTypes } from "sequelize";

import db from "../db";
import { Product } from "../interfaces/Product";
import { Order } from "../interfaces/Order";

class ProductOrder extends Model {
  id: number;
  qty: number;
  order: Order;
  product: Product;
}

ProductOrder.init(
  {
    qty: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize: db, modelName: "productorders" }
);

export default ProductOrder;
