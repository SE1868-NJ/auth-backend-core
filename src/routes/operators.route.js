import express from "express";
import { login, register } from "../controllers/auth.controller.js";

import { createOperators, getOperators } from "../controllers/operators.controller.js";

const operatorsRouter = express.Router();

operatorsRouter.get("/", getOperators);

operatorsRouter.post("/create", createOperators);

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

export default operatorsRouter;
