import { Model, DataTypes } from "sequelize";
import db from "../db";

class Payments extends Model {}

Payments.init(
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["cash", "card", "paypal", "btc"]],
          msg: "Payment type must be one of: 'cash', 'card', 'paypal', 'btc'",
        },
      },
    },
  },
  { sequelize: db, modelName: "payments" }
);

export default Payments;
