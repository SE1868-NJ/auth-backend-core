import dotenv from "dotenv";
dotenv.config("./.env");
// JWT SECRET
export const JWT_SECRET = process.env.JWT_SECRET || "jwtsecret";

export const DB = process.env.DB || "postgres://postgres:vietnt@localhost:5432/swp";
