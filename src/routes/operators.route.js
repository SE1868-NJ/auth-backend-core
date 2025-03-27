import express from "express";

import {
    createOperators,
    getOperatorById,
    getOperators,
    getOperatorsList,
    updateOperatorContactInfo,
    updateUser
} from "../controllers/operators.controller.js";

const operatorsRouter = express.Router();


operatorsRouter.patch("/update/contact/:id", updateOperatorContactInfo );
operatorsRouter.post("/create", createOperators);
operatorsRouter.get("/list", getOperatorsList);
operatorsRouter.get("/:id", getOperatorById)


operatorsRouter.patch("/update/:id", updateUser);
operatorsRouter.get("/", getOperators);

export default operatorsRouter;
