import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { CustomError } from "./common/errors/customError";
import { errorHandler } from "./common/middlewars/errorHandler";
import connectDB from "./config/db";
import authRoutes from "./modules/auth/routes";
import logBookRoutes from "./modules/logbook/routes";
import permissionRoutes from "./modules/permissions/routes";
import userRoutes from "./modules/user/routes";
const app: Application = express();

app.use(express.json());

connectDB();

app.use(cors());

app.use("/auth", authRoutes);
app.use("/permissions", permissionRoutes);
app.use("/users", userRoutes);
app.use("/logbooks", logBookRoutes);

app.use(
  (
    err: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    errorHandler(err, req, res, next);
  }
);

export default app;
