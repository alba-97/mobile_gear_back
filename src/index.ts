import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import db from "./db";
import seeder from "./seed";
import routes from "./routes";

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

app.use("/api", routes);

const force = false;

db.sync({ force })
  .then(function () {
    if (force) {
      seeder();
      console.log("Fake data created");
    }
    app.listen(8080, () => console.log("Server listening on port 8080"));
  })
  .catch((error: Error) => console.log(error));

export default app;
