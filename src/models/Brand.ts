import { Model, DataTypes } from "sequelize";
import db from "../db";

class Brand extends Model {
  id: number;
  name: string;
}
Brand.init(
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

export default Brand;
