import dotenv from "dotenv";
dotenv.config({
    path: "../.env",
});

// DB config
export const DATABASE = process.env.DATABASE || "db";
export const USERNAME = process.env.USERNAME || "root";
export const PASSWORD = process.env.PASSWORD || "123";
export const DIALECT = process.env.DIALECT || "mysql";
export const DBHOST = process.env.DIALECT || "localhost";
