import express from "express";
import { registerResearcher } from "./controller";

const router = express.Router();

router.post("/register/researcher", async (req, res, next) => {
  try {
    await registerResearcher(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

export default router;
