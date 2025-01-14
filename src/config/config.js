import dotenv from "dotenv";
dotenv.config();

// JWT SECRET
export const JWT_SECRET = process.env.JWT_SECRET || "jwtsecret";

// DB config
export const DATABASE = "user";
export const USERNAME = "root";
export const PASSWORD = process.env.PASSWORD || "spring";
export const DIALECT = process.env.DIALECT || "mysql";
export const DBHOST = process.env.DIALECT || "localhost";
