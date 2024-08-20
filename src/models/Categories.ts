import { Model, DataTypes } from "sequelize";
import db from "../db";

class Categories extends Model {
  id: number;
  name: string;
}
Categories.init(
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

export default Categories;
