import express from "express";
import { getAllRoles } from "../controllers/role.controller.js";

const router = express.Router();

router.get("/", getAllRoles);

export default router;
