import express from "express";
import { changePassword } from "../controllers/users.controller.js";

const usersRouter = express.Router();

usersRouter.post("/changePassword", changePassword);

export default usersRouter;
