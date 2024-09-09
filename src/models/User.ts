import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

import db from "../db";
import Order from "./Order";

class User extends Model {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
  password: string;
  salt: string;
  checkoutId: number;
  hash: (plainPassword: string, salt: string) => Promise<string>;
  validatePassword: (password: string) => Promise<boolean>;
  setOrders: (order: Order) => void;
}
User.init(
  {
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    checkoutId: {
      type: DataTypes.INTEGER,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: db,
    modelName: "users",
  }
);

User.beforeCreate((user: User) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;

  return user.hash(user.password, user.salt).then((hash: string) => {
    user.password = hash;
  });
});

User.prototype.hash = function (plainPassword: string, salt: string) {
  return bcrypt.hash(plainPassword, salt);
};

User.prototype.validatePassword = function (password: string) {
  return bcrypt
    .hash(password, this.salt)
    .then((hash: string) => hash === this.password);
};

export default User;
