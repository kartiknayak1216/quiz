import express from "express";
import {
  get,
  google,
  signOut,
  update,
} from "../controllers/Auth.controller.js";

const router = express.Router();

router.post("/google", google);
router.post("/signout", signOut);
router.put("/users/:userId/marks", update);
router.get("/users/:userId/marks", get);

export default router;
