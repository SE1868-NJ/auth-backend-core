import express from "express";
import { User } from "../models/user.model.js";

const userRouter = express.Router();

// /api/v1/users
userRouter.get("/", (req, res) => {
    res.status(200).json({
        message: "get users success!",
    });
});

export default userRouter;
