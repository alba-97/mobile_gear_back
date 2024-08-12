import Sequelize from "sequelize";
import db from "../db";

class Brands extends Sequelize.Model {
  public id!: number;
  public name!: string;
}
Brands.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "brands",
  }
);

export { Brands };
