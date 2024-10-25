import express from "express";
import { addNewLogBook, searchLogBooks } from "./controller";
import { authenticate } from "../../common/middlewars/auth";

const router = express.Router();

router.post("/", authenticate, async (req, res, next) => {
  try {
    await addNewLogBook(req, res, next);
  } catch (error) {
    console.log(error);
  }
});


router.get("/search", authenticate, async (req, res, next) => {
  try {
    await searchLogBooks(req, res, next);
  } catch (error) {
    next(error)
  }
});

export default router;
