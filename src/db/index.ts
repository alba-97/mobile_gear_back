import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
  process.env.POSTGRES_DB ?? "",
  process.env.POSTGRES_USER ?? "",
  process.env.POSTGRES_PASSWORD,
  {
    dialect: "postgres",
    logging: false,
    host: process.env.DB_HOST,
  }
);

export default db;
