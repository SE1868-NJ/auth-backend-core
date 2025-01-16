import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Role = sequelize.define(
    "Role",
    {
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "roles",
    },
);

// Định nghĩa mối quan hệ
Role.associate = (models) => {
    Role.hasMany(models.User, {
        foreignKey: "role_id", // Trường khóa ngoại trong bảng `User`
        as: "users", // Bí danh để truy vấn
    });
};

export default (sequelize, DataTypes) => {
    return Role;
};
