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

router.post("/register/partner", async (req, res, next) => {
  try {
    await registerPartner(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

router.get("/profile", authenticate, async (req, res, next) => {
  try {
    await getUserProfile(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    await getUsers(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:userId", authenticate, isAdmin, async (req, res, next) => {
  try {
    await deleteUser(req, res, next);
  } catch (error) {
    console.log(error);
  }
});

export default router;
