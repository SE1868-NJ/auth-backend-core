import dotenv from "dotenv";
dotenv.config("./.env");
// JWT SECRET
export const JWT_SECRET = process.env.JWT_SECRET || "jwtsecret";

export const DB = process.env.DB || "postgres://postgres:eomeo5104@localhost:5432/swp";
