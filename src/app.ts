import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { CustomError } from "./common/errors/customError";
import { errorHandler } from "./common/middlewars/errorHandler";
import connectDB from "./config/db";
import { registerResearcher } from "./modules/user/controller";
const app: Application = express();
const router = express.Router();


const allowedOrigins = [
  "https://bitacora-web-blue.vercel.app", // Frontend
  "https://producto-final-chi.vercel.app", // Backend
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.options("*", cors());
app.use(express.json());


connectDB();

router.post("/register/researcher", async (req, res, next) => {
  try {
    await registerResearcher(req, res, next);
  } catch (error) {
    console.log(error);
  }
});


app.use("/users", router);

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
