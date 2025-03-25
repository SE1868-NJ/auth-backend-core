import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Operator = sequelize.define("Operator", {
    operatorID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
            "https://res.cloudinary.com/dafn4ktx0/image/upload/v1741914627/default_avatar_zqgyov.jpg",
        validate: {
            notEmpty: true,
        },
    },
    avatar_public_id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "swp_storage_image/default_avatar_zqgyov",
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [10, 15],
        },
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
    },
    roleCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default (sequelize, DataTypes) => {
    return Operator;
};
