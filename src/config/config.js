import dotenv from "dotenv";
dotenv.config("./.env");

// JWT SECRET
export const JWT_SECRET = process.env.JWT_SECRET || "jwtsecret";

// DB config
export const DATABASE = process.env.DATABASE || "newdb";
export const USERNAME = process.env.USERNAME || "root";
export const PASSWORD = process.env.PASSWORD || "1234";
export const DIALECT = process.env.DIALECT || "mysql";
export const DBHOST = process.env.DIALECT || "localhost";
export const DB = process.env.DB || "test";
