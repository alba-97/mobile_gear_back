const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./db");
const seeder = require("./seed");
require("dotenv").config();

const routes = require("./routes");

const app = express();

app.use(express.json());

const ORIGIN = process.env.ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/", routes);

const force = true;

db.sync({ force })
  .then(function () {
    if (force) {
      seeder();
      console.log("Fake data created");
    }
    app.listen(8080, () => console.log("Server listening on port 8080"));
  })
  .catch((error) => console.log(error));

module.exports = app;
