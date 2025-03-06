import express from "express";
import { changePassword } from "../controllers/users.controller.js";
import verifyToken from "../middlewares/auth.js";

const usersRouter = express.Router();

usersRouter.post("/changePassword/:role", verifyToken, changePassword);

export default usersRouter;
