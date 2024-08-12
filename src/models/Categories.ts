import Sequelize from "sequelize";
import db from "../db";

class Categories extends Sequelize.Model {
  public id!: number;
  public name!: string;
}
Categories.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "categories",
  }
);

export { Categories };
