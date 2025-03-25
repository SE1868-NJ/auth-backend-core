import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Admin = sequelize.define(
    "Admin",
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        google_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
            validate: {
                isAlphanumeric: {
                    msg: "Google ID contains only letters and numbers.",
                },
                len: {
                    args: [1, 255],
                    msg: "Google ID must be between 1 and 255 characters in length.",
                },
            },
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

            validate: {
                isEmail: {
                    msg: "Invalid email.",
                },
                len: {
                    args: [5, 255],
                    msg: "Email must be between 5 and 255 characters in length.",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 255],
                    msg: "Password must be at least 6 characters long.",
                },
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: "Phone number must contain only numbers.",
                },
                len: {
                    args: [10, 15],
                    msg: "Phone number must be between 10 and 15 characters in length.",
                },
            },
        },

        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Last name must be between 1 and 100 characters in length.",
                },
            },
        },

        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "First name must be between 1 and 100 characters in length.",
                },
            },
        },

        dob: {
            type: DataTypes.DATE,
            allowNull: false,

            validate: {
                isDate: {
                    msg: "Date of birth must be a valid date format.",
                },
                isBefore: {
                    args: new Date().toISOString().split("T")[0], // Kiểm tra ngày trước hôm nay
                    msg: "Date of birth must be a date before the current date.",
                },
            },
        },

        gender: {
            type: DataTypes.STRING,
            allowNull: false,

            validate: {
                isIn: {
                    args: [["male", "female", "other"]],
                    msg: "Gender must be male, female, or other.",
                },
            },
        },
        status: {
            type: DataTypes.ENUM("active", "deactive"),
            defaultValue: "deactive",
        },
    },
    {
        tableName: "admins",
    },
);

export default (sequelize, DataTypes) => {
    return Admin;
};
