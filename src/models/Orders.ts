import { Deliverys } from "./Deliverys";
import { Payments } from "./Payments";
import { Users } from "./Users";

import Sequelize from "sequelize";
import db from "../db";
import { Delivery } from "../interfaces/Delivery";

class Orders extends Sequelize.Model {
  id: number;
  status: string;
  delivery: Delivery;
  setUsers: (user: Users | null) => void;
}

Orders.init(
  {
    total_value: {
      type: Sequelize.FLOAT,
    },
    status: {
      type: Sequelize.STRING,
    },
  },
  { sequelize: db, modelName: "orders" }
);

Orders.belongsTo(Payments);
Orders.belongsTo(Deliverys);
Orders.belongsToMany(Users, { through: "orderhistory" });

export { Orders };
