import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Operator = sequelize.define(
    "Operator",
    {
        operatorID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        operatorName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
            set(value) {
                this.setDataValue("mail", value.toLowerCase());
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 100], // Minimum 8 characters
            },
        },
        status: {
            type: DataTypes.ENUM("active", "inactive"),
            defaultValue: "active",
        },
    },
    {
        timestamps: true, // Adds createdAt & updatedAt automatically
    },
);

export default (sequelize, DataTypes) => {
    return Operator;
};
