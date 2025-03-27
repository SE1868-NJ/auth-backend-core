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
        allowNull: true,
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
    personalEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
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
            len: [10, 15], // Số điện thoại từ 10-15 ký tự
        },
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY, // Chỉ lưu ngày (YYYY-MM-DD)
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM("male", "female", "other"), // Giới tính có thể là Nam, Nữ hoặc Khác
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("active", "inactive", "pending"),
        allowNull: false,
        defaultValue: "pending",
    },
});

export default (sequelize, DataTypes) => {
    return Operator;
};