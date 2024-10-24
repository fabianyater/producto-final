import express from "express";
import { addNewLogBook } from "./controller";
import { authenticate } from "../../common/middlewars/auth";

const router = express.Router();

router.post("/", authenticate, async (req, res, next) => {
  try {
    await addNewLogBook(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

export default router;
