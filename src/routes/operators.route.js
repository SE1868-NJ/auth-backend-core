import express from "express";

import { createOperators, getOperators } from "../controllers/operators.controller.js";

const operatorsRouter = express.Router();

operatorsRouter.get("/", getOperators);

operatorsRouter.post("/create", createOperators);
operatorsRouter.post("/login");

export default operatorsRouter;
