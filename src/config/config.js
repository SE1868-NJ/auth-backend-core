import dotenv from "dotenv";
dotenv.config();

// JWT SECRET
export const JWT_SECRET = process.env.JWT_SECRET || "jwtsecret";

// DB config
// export const DATABASE = "testDB";
// export const USERNAME = "testDB_owner";
// export const PASSWORD = "IEw2dbUDihn9";
// export const DIALECT = "postgres";
// export const DBHOST = "ep-soft-base-a58sfsqj.us-east-2.aws.neon.tech";

export const DB = "postgresql://postgres:12345@localhost:5432/jspu";
