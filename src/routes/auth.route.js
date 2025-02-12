import express from "express";
import {
    getSession,
    login,
    register,
    resetPassword,
    sendOtp,
    verifyOtp,
} from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/auth.js";

const authRouter = express.Router();

// /api/v1/auth/login
authRouter.post("/login/:role", login);
authRouter.post("/register", register);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);

// /api/v1/auth/session
authRouter.get("/session", verifyToken, getSession);

export default authRouter;
