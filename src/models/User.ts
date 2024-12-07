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
  id!: number;
  username!: string;
  email!: string;
  is_admin!: boolean;
  password!: string;
  salt!: string;
  checkoutId!: number;

  getOrders!: HasManyGetAssociationsMixin<Order>;
  setOrders!: HasManySetAssociationsMixin<Order, number>;
  addOrder!: HasManyAddAssociationMixin<Order, number>;
  addOrders!: HasManyAddAssociationsMixin<Order, number>;
  createOrder!: HasManyCreateAssociationMixin<Order>;

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
    username: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    checkoutId: { type: DataTypes.INTEGER },
    password: { type: DataTypes.STRING, allowNull: false },
    salt: { type: DataTypes.STRING },
  },
  {
    sequelize: db,
    modelName: "users",
    timestamps: true,
  }
);

User.beforeCreate((user: User) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;

  return user.hash(user.password, user.salt).then((hash: string) => {
    user.password = hash;
  });
});

export default User;
