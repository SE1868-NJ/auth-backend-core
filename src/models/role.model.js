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

Role.associations = (models) => {
    Role.belongsToMany(models.User, {
        through: models.User_Role,
        foreignKey: "role_id",
        as: "users",
    });
};

export default (sequelize, DataTypes) => {
    return Role;
};
