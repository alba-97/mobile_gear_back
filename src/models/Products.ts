import { Model, DataTypes } from "sequelize";

import db from "../db";

class Products extends Model {
  name: string;
  product_img: string;
  description: string;
  features: string;
  price: number;
  discount: number;
  stock: number;
}
Products.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    product_img: {
      type: DataTypes.STRING,
    },

    description: {
      type: DataTypes.TEXT,
    },

    features: {
      type: DataTypes.TEXT,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    discount: {
      type: DataTypes.INTEGER,
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "products",
  }
);

export default Products;
