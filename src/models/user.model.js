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
            unique: true,
            allowNull: true,
            validate: {
                isAlphanumeric: {
                    msg: "Google ID chỉ chứa các ký tự và số.",
                },
                len: {
                    args: [1, 255],
                    msg: "Google ID phải có độ dài từ 1 đến 255 ký tự.",
                },
            },
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

            validate: {
                isEmail: {
                    msg: "Email không hợp lệ.",
                },
                len: {
                    args: [5, 255],
                    msg: "Email phải có độ dài từ 5 đến 255 ký tự.",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 255],
                    msg: "Mật khẩu phải có ít nhất 6 ký tự.",
                },
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: "Số điện thoại phải chỉ chứa các số.",
                },
                len: {
                    args: [10, 15],
                    msg: "Số điện thoại phải có độ dài từ 10 đến 15 ký tự.",
                },
            },
        },

        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Họ phải có độ dài từ 1 đến 100 ký tự.",
                },
            },
        },

        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "Họ phải có độ dài từ 1 đến 100 ký tự.",
                },
            },
        },

        dob: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: {
                    msg: "Ngày sinh phải là một định dạng ngày hợp lệ.",
                },
                isBefore: {
                    args: new Date().toISOString().split("T")[0], // Kiểm tra ngày trước hôm nay
                    msg: "Ngày sinh phải là một ngày trước ngày hiện tại.",
                },
            },
        },

        gender: {
            type: DataTypes.STRING,
            allowNull: false,

            validate: {
                isIn: {
                    args: [["male", "female", "other"]],
                    msg: "Giới tính phải là male, female hoặc other.",
                },
            },
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
