import express from "express";
import { authenticate } from "../../common/middlewars/auth";
import { isAdmin } from "../../common/middlewars/isAdmin";
import { getPermissions } from "./controller";

const router = express.Router();

router.get("/", authenticate, isAdmin, async (req, res, next) => {
  try {
    await getPermissions(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;
