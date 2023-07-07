require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DB_URL, {
  dialectModule: require("pg"),
  logging: false,
});

module.exports = db;
