import { Model, DataTypes } from "sequelize";
import db from "../db";

class Delivery extends Model {
  id: number;
  eta: Date;
  type: string;
  value: number;
}

Delivery.init(
  {
    type: { type: DataTypes.STRING },
    value: { type: DataTypes.FLOAT },
    eta: { type: DataTypes.DATE, defaultValue: new Date() },
  },
  { sequelize: db, modelName: "deliveries" }
);

export default Delivery;
