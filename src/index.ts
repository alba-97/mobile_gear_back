import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./db";
import container from "./container";
import { loadControllers, scopePerRequest } from "awilix-express";

dotenv.config();
const app = express();

app.use(express.json());
app.use(scopePerRequest(container));

const PORT = process.env.PORT;
const ORIGIN = process.env.ORIGIN;

app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());

const router = express.Router();
app.use("/api", router);
router.use(loadControllers("controllers/*.{js,ts}", { cwd: __dirname }));

db.sync()
  .then(function () {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((error: Error) => console.log(error));

export default app;
