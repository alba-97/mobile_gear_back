import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/products.routes";
import orderRoutes from "./routes/orders.routes";
import checkoutRoutes from "./routes/checkout.routes";
import authenticateToken from "./middleware/authenticateToken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", authenticateToken, orderRoutes);
app.use("/api/checkout", authenticateToken, checkoutRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something broke!", error: err.message });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
