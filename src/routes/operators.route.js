import express from "express";

import { createOperators, getOperators, updateUser } from "../controllers/operators.controller.js";

const operatorsRouter = express.Router();

operatorsRouter.post("/create", createOperators);

operatorsRouter.patch("/update/:id", updateUser);
operatorsRouter.get("/", getOperators);

export default operatorsRouter;
