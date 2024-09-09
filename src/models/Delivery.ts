import { Model, DataTypes } from "sequelize";
import db from "../db";

class Deliverys extends Model {
  id: number;
  eta: Date;
  type: string;
  value: number;
}

Deliverys.init(
  {
    type: { type: DataTypes.STRING },
    value: { type: DataTypes.FLOAT },
    eta: { type: DataTypes.DATE, defaultValue: new Date() },
  },
  { sequelize: db, modelName: "deliverys" }
);

export default Deliverys;
