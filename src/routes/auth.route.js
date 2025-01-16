import express from "express";
import { login, register, sendOtp, verifyOtp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);

// authRouter.get("/insert", (req, res) => {
//     User.create({
//         google_id: "googleid",
//         email: "khuyen.dev183@gmail.com",
//         password: "123456789",
//         phone: "0912345678",
//         firstname: "Khuyen",
//         lastname: "Tran",
//         gender: "male"
//     })
//     res.status(500).json({
//         message: "root auth",
//     });
// });

export default authRouter;
