import express from "express";
import { login } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", login);

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
