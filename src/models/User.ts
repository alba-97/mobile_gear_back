import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
} from "sequelize";
import db from "../db";
import Order from "./Order";
import bcrypt from "bcrypt";

class User extends Model {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
  password: string;
  salt: string;
  checkoutId: number;

  getOrders: HasManyGetAssociationsMixin<Order>;
  setOrders: HasManySetAssociationsMixin<Order, number>;
  addOrder: HasManyAddAssociationMixin<Order, number>;
  addOrders: HasManyAddAssociationsMixin<Order, number>;
  createOrder: HasManyCreateAssociationMixin<Order>;

  hash(plainPassword: string, salt: string): Promise<string> {
    return bcrypt.hash(plainPassword, salt);
  }

  validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    is_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 30],
          msg: "Username must be between 3 and 30 characters long",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Must be a valid email address" },
      },
    },
    checkoutId: { type: DataTypes.INTEGER },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: "Password must be at least 8 characters long",
        },
      },
    },
    salt: { type: DataTypes.STRING },
  },
  {
    sequelize: db,
    modelName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        const salt = bcrypt.genSaltSync(10);
        user.salt = salt;
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed("password")) {
          const salt = bcrypt.genSaltSync(10);
          user.salt = salt;
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;
