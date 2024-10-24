import { Router } from "express";
import { login } from "./controller";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    console.log(error);
  }
});

export default router;
