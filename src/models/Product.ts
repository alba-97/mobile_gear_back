import { Model, DataTypes } from "sequelize";
import db from "../db";

class Product extends Model {
  name: string;
  productImg: string;
  description: string;
  features: string;
  price: number;
  discount: number;
  stock: number;
}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
      },
    },

    productImg: {
      type: DataTypes.STRING,
      validate: {
        isUrl: { msg: "Product image must be a valid URL" },
      },
    },

    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },

    features: {
      type: DataTypes.TEXT,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { msg: "Price must be a valid number" },
        min: { args: [0], msg: "Price must be greater than 0" },
      },
    },

    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: { msg: "Discount must be an integer" },
        min: { args: [0], msg: "Discount must be at least 0" },
        max: { args: [100], msg: "Discount cannot exceed 100" },
      },
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Stock must be an integer" },
        min: { args: [0], msg: "Stock must be at least 0" },
      },
    },
  },
  {
    sequelize: db,
    modelName: "products",
  }
);

export default Product;
