import Sequelize from "sequelize";
import db from "../db";

class Payments extends Sequelize.Model {}

Payments.init(
  {
    type: { type: Sequelize.STRING },
  },
  { sequelize: db, modelName: "payments" }
);

export { Payments };
