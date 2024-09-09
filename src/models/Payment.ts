import { Model, DataTypes } from "sequelize";
import db from "../db";

class Payments extends Model {}

Payments.init(
  {
    type: { type: DataTypes.STRING },
  },
  { sequelize: db, modelName: "payments" }
);

export default Payments;
