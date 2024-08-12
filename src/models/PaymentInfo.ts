import Sequelize from "sequelize";
import db from "../db";

class PaymentInfo extends Sequelize.Model {}
PaymentInfo.init(
  {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birth_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    dni: {
      type: Sequelize.INTEGER,
      unique: true,
    },
    address: {
      type: Sequelize.TEXT,
    },

    phone_number: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "paymentinfo",
  }
);

export { PaymentInfo };
