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

export default (sequelize, DataTypes) => {
    return Role;
};
