import express, { Application } from "express";
import connectDB from "./config/db";
import authRoutes from "./modules/auth/routes";
import logBookRoutes from "./modules/logbook/routes";
import userRoutes from "./modules/user/routes";

const app: Application = express();

connectDB();

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/users", userRoutes);
app.use("/logbooks", logBookRoutes);

export default app;
