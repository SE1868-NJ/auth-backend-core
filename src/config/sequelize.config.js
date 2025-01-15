import { PostgresDialect } from "@sequelize/postgres";
import { Sequelize } from "sequelize";
import { DB } from "./config.js";
const sequelize = new Sequelize(DB, {
    dialect: PostgresDialect,
});

// Kiểm tra kết nối ngay khi khởi chạy
sequelize
    .authenticate()
    .then(() => console.log("Database connected successfully!"))
    .catch((err) => console.error("Failed to connect to the database:", err));

export default sequelize;
