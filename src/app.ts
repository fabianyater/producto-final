import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { CustomError } from "./common/errors/customError";
import { authenticate } from "./common/middlewars/auth";
import checkPermission from "./common/middlewars/checkPermissions";
import { errorHandler } from "./common/middlewars/errorHandler";
import { isAdmin } from "./common/middlewars/isAdmin";
import connectDB from "./config/db";
import { login, validateToken } from "./modules/auth/controller";
import {
  addNewLogBook,
  filterLogBooks,
  getLogBookById,
  getUserLogBookLocations,
  listLogBooksPaginated,
  searchLogBooks,
} from "./modules/logbook/controller";
import { getPermissions } from "./modules/permissions/controller";
import {
  deleteUser,
  getUserProfile,
  getUsers,
  registerPartner,
  registerResearcher,
} from "./modules/user/controller";
const app: Application = express();

app.use(express.json());

connectDB();

app.use(cors());

app.use("/auth/login", async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    console.log(error);
  }
});

app.use("/auth/validateToken", async (req, res) => {
  try {
    await validateToken(req, res);
  } catch (error) {
    console.log(error);
  }
});

app.use("/permissions", authenticate, isAdmin, async (req, res, next) => {
  try {
    await getPermissions(req, res, next);
  } catch (error) {
    next(error);
  }
});

app.use("/users/register/researcher", async (req, res, next) => {
  try {
    await registerResearcher(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

app.use("/users/register/partner", async (req, res, next) => {
  try {
    await registerPartner(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

app.use("/users/profile/:userId", authenticate, async (req, res, next) => {
  try {
    await getUserProfile(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

app.use("/users/", authenticate, isAdmin, async (req, res, next) => {
  try {
    await getUsers(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

app.use("/users/:userId", authenticate, isAdmin, async (req, res, next) => {
  try {
    await deleteUser(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

app.use(
  "/logbooks/",
  authenticate,
  checkPermission("agregar bitacora", "write"),
  async (req, res, next) => {
    try {
      await addNewLogBook(req, res, next);
    } catch (error) {
      console.log(error);
    }
  }
);
app.use("/logbooks/search", authenticate, async (req, res, next) => {
  try {
    await searchLogBooks(req, res, next);
  } catch (error) {
    next(error);
  }
});
app.use("/logbooks/filter", authenticate, async (req, res, next) => {
  try {
    await filterLogBooks(req, res, next);
  } catch (error) {
    next(error);
  }
});
app.use("/logbooks/", authenticate, async (req, res, next) => {
  try {
    await listLogBooksPaginated(req, res, next);
  } catch (error) {
    next(error);
  }
});
app.use("/logbooks/:id", authenticate, async (req, res, next) => {
  try {
    await getLogBookById(req, res, next);
  } catch (error) {
    next(error);
  }
});
app.use("/logbooks/locations", authenticate, async (req, res, next) => {
  try {
    await getUserLogBookLocations(req, res, next);
  } catch (error) {
    next(error);
  }
});

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
