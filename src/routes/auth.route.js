import express from "express";
import { getSession, login } from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/auth.js";

const authRouter = express.Router();

// /api/v1/auth/login
authRouter.post("/login", login);

// /api/v1/auth/session
authRouter.get("/session", verifyToken, getSession);

export default authRouter;
