import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const User = sequelize.define("User", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});

export default (sequelize, DataTypes) => {
    return User;
};
