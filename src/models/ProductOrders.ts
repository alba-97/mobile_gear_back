import { Orders } from "./Orders";
import { Products } from "./Products";
import { Users } from "./Users";

import Sequelize from "sequelize";
import db from "../db";
import { Product } from "../interfaces/Product";
import { Order } from "../interfaces/Order";

class ProductOrders extends Sequelize.Model {
  id: number;
  qty: number;
  order: Order;
  product: Product;
}

ProductOrders.init(
  {
    qty: {
      type: Sequelize.INTEGER,
    },
  },
  { sequelize: db, modelName: "productorders" }
);

ProductOrders.belongsTo(Products);
ProductOrders.belongsTo(Users);
ProductOrders.belongsTo(Orders);

export { ProductOrders };
