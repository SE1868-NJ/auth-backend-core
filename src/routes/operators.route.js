import express from "express";
import { createOperators, getOperators, updateUser } from "../controllers/operators.controller.js";

const operatorsRouter = express.Router();

operatorsRouter.post("/create", createOperators);
operatorsRouter.patch("/update/:id", updateUser);
operatorsRouter.get("/", getOperators);

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
