import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import db from "./db";
import routes from "./routes";

const app = express();

app.use(express.json());

const PORT = process.env.PORT;
const ORIGIN = process.env.ORIGIN;

app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api", routes);

db.sync()
  .then(function () {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((error: Error) => console.log(error));

export default app;
