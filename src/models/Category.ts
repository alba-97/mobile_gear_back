import { Model, DataTypes } from "sequelize";
import db from "../db";

class Category extends Model {
  id!: number;
  name!: string;
}
Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "categories",
  }
);

export default Category;
