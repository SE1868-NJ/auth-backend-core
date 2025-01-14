import { PostgresDialect } from "@sequelize/postgres";
import { Sequelize } from "sequelize";
import { DATABASE, DB, DBHOST, DIALECT, PASSWORD, USERNAME } from "./config.js";

const sequelize = new Sequelize(DB, {
    dialect: PostgresDialect,
    dialectOptions: {
        ssl: {
            require: true, // Enforce SSL connection
            rejectUnauthorized: false, // Optional: If you encounter SSL certificate issues
        },
    },
});

export default sequelize;
