import { Model, DataTypes } from "sequelize";
import db from "../db";

class PaymentInfo extends Model {}
PaymentInfo.init(
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dni: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    address: {
      type: DataTypes.TEXT,
    },

    phone_number: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "paymentinfo",
  }
);

export default PaymentInfo;
