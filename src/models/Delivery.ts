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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["home delivery", "pick up"]],
          msg: "Delivery type must be either 'home delivery' or 'pick up'",
        },
      },
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        isFloat: { msg: "Delivery value must be a valid number" },
        min: { args: [0], msg: "Delivery value cannot be negative" },
      },
    },
    eta: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isStringDate: { msg: "ETA must be a valid date" },
      },
    },
  },
  { sequelize: db, modelName: "deliveries" }
);

export default Delivery;
