import { Router } from "express";
import { login, validateToken } from "./controller";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    console.log(error);
  }
});

router.get("/validateToken", async (req, res) => {
  try {
    await validateToken(req, res);
  } catch (error) {
    console.log(error);
  }
});


export default router;
