import { Model, DataTypes } from "sequelize";
import db from "../db";

class Brands extends Model {
  id: number;
  name: string;
}
Brands.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "brands",
  }
);

export default Brands;
