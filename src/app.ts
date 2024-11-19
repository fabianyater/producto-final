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

app.use(cors());

/* app.use(
  cors({
    origin: ["https://bitacora-web-blue.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
    optionsSuccessStatus: 200,
  })
); */

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://bitacora-web-blue.vercel.app");
  res.header("Access-Control-Allow-Headers", ["Content-Type", "Authorization"]);
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.sendStatus(200);
});

connectDB();

app.use(express.json());

app.use("/auth", cors(), authRoutes);
app.use("/permissions", cors(), permissionRoutes);
app.use("/users", cors(), userRoutes);
app.use("/logbooks", cors(), logBookRoutes);

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
