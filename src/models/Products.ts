import { Brands } from "./Brands.js";
import { Categories } from "./Categories.js";

import Sequelize from "sequelize";
import db from "../db";

class Products extends Sequelize.Model {
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
      type: Sequelize.STRING,
      allowNull: false,
    },

    product_img: {
      type: Sequelize.STRING,
    },

    description: {
      type: Sequelize.TEXT,
    },

    features: {
      type: Sequelize.TEXT,
    },

    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },

    discount: {
      type: Sequelize.INTEGER,
    },

    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "products",
  }
);

Products.belongsTo(Brands);
Products.belongsTo(Categories);

export { Products };
