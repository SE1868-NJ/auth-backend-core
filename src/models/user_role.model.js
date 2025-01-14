import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const User_Role = sequelize.define(
    "User_Role",
    {
        user_role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "user_id",
            },
            allowNull: false,
        },

        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "roles",
                key: "role_id",
            },
            allowNull: false,
        },
    },
    {
        tableName: "users_roles",
    },
);

export default (sequelize, DataTypes) => {
    return User_Role;
};
