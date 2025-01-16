import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import { User } from "../models/user.model.js";

const userRouter = express.Router();

// /api/v1/users
userRouter.get("/", getAllUsers);

export default userRouter;
