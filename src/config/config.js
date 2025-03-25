import dotenv from "dotenv";
dotenv.config();

// DB config

export const DATABASE = process.env.DATABASE || "admin";
export const USERNAME = "root";
export const PASSWORD = "";
export const DIALECT = process.env.DIALECT || "mysql";
export const DBHOST = process.env.DBHOST || "localhost";
export const EMAIL_NAME = process.env.EMAIL_NAME;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
