import express from "express";
import { authenticate } from "../../common/middlewars/auth";
import checkPermission from "../../common/middlewars/checkPermissions";
import {
  addNewLogBook,
  filterLogBooks,
  getLogBookById,
  getUserLogBookLocations,
  listLogBooksPaginated,
  searchLogBooks,
} from "./controller";

const router = express.Router();

router.post(
  "/",
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

router.get("/search", authenticate, async (req, res, next) => {
  try {
    await searchLogBooks(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get("/filter", authenticate, async (req, res, next) => {
  try {
    await filterLogBooks(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get("/", authenticate, async (req, res, next) => {
  try {
    await listLogBooksPaginated(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    await getLogBookById(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.post("/locations", authenticate, async (req, res, next) => {
  try {
    await getUserLogBookLocations(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;
