import Sequelize from "sequelize";
import db from "../db";

class Deliverys extends Sequelize.Model {
  public id!: number;
  public eta!: Date;
  public type!: string;
  public value!: number;
}

Deliverys.init(
  {
    type: { type: Sequelize.STRING },
    value: { type: Sequelize.FLOAT },
    eta: { type: Sequelize.DATE, defaultValue: new Date() },
  },
  { sequelize: db, modelName: "deliverys" }
);

export { Deliverys };
