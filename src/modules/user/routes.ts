import express from "express";
import { authenticate } from "../../common/middlewars/auth";
import { isAdmin } from "../../common/middlewars/isAdmin";
import {
  deleteUser,
  getUserProfile,
  getUsers,
  registerPartner,
  registerResearcher,
} from "./controller";

const router = express.Router();

router.post("/register/researcher", async (req, res, next) => {
  try {
    await registerResearcher(req, res, next);
  } catch (error) {
    console.log(error);
  }
});


export default router;
