import bcrypt from "bcrypt";
import Sequelize from "sequelize";

import db from "../db";
import { Orders } from "./Orders";
import { PaymentInfo } from "./PaymentInfo";

class Users extends Sequelize.Model {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
  password: string;
  salt: string;
  checkoutId: number;
  hash: (plainPassword: string, salt: string) => Promise<string>;
  validatePassword: (password: string) => Promise<boolean>;
  setOrders: (order: Orders) => void;
}
Users.init(
  {
    is_admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    checkoutId: {
      type: Sequelize.INTEGER,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE,
    },
  },
  {
    sequelize: db,
    modelName: "users",
  }
);

Users.beforeCreate((user: Users) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;

  return user.hash(user.password, user.salt).then((hash: string) => {
    user.password = hash;
  });
});

Users.prototype.hash = function (plainPassword: string, salt: string) {
  return bcrypt.hash(plainPassword, salt);
};

Users.prototype.validatePassword = function (password: string) {
  return bcrypt
    .hash(password, this.salt)
    .then((hash: string) => hash === this.password);
};
Users.belongsTo(PaymentInfo);
Users.belongsToMany(Orders, { through: "orderhistory" });

export { Users };
