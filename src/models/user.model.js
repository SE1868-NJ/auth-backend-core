import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const User = sequelize.define(
    "User",
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        google_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("active", "deactive"),
            defaultValue: "active",
        },
    },
    {
        tableName: "users",
    },
);

User.associations = (models) => {
    User.belongsToMany(models.Role, {
        through: models.User_Role,
        foreignKey: "user_id",
        as: "roles",
    });
};

export default (sequelize, DataTypes) => {
    return User;
};
