import { Model, DataTypes } from "sequelize";
import db from "../db";

class PaymentInfo extends Model {}
PaymentInfo.init(
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "First name cannot be empty" },
        len: {
          args: [1, 50],
          msg: "First name must be between 1 and 50 characters",
        },
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Last name cannot be empty" },
        len: {
          args: [1, 50],
          msg: "Last name must be between 1 and 50 characters",
        },
      },
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isStringDate: { msg: "Birth date must be a valid date" },
        isValidBirthDate(value: Date) {
          if (new Date(value) > new Date()) {
            throw new Error("Birth date cannot be in the future");
          }
        },
      },
    },
    idNumber: {
      type: DataTypes.INTEGER,
      unique: true,
      validate: {
        isNumeric: { msg: "ID number must contain only numbers" },
      },
    },
    address: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: { msg: "Address cannot be empty" },
      },
    },

    phone_number: {
      type: DataTypes.INTEGER,
      unique: true,
      validate: {
        isNumeric: { msg: "Phone number must contain only numbers" },
      },
    },
  },
  {
    sequelize: db,
    modelName: "paymentinfo",
  }
);

export default PaymentInfo;
