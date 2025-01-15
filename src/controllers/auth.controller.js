import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import sequelize from "../config/sequelize.config.js";
import { Role } from "../models/role.model.js";
import { User } from "../models/user.model.js";
import { hashPassword } from "../utils/index.js";

export const login = (req, res) => {
    console.log("123");

    // get email, password from user through request.body
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(401).json({
            message: "Invalid email, password!",
        });
    }

    // get all users from db
    User.findAll()
        .then((users) => {
            // check user valid or not

            const isValid = users.some(
                (user) => user.email === email && bcrypt.compareSync(password, user.password),
            );

            if (isValid) {
                const accessToken = jwt.sign(
                    {
                        userInfo: "userInfo",
                    },
                    JWT_SECRET,
                );
                res.status(200).json({
                    token: accessToken,
                });
            } else {
                res.status(401).json({
                    message: "Invalid email, password!",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: "An error occured during login!",
            });
        });
};

export const register = async (req, res) => {
    const transaction = await sequelize.transaction(); // bắt đầu 1 transaction
    try {
        const { email, password, phone, firstname, lastname, dob, gender } = req.body;

        // Check if the user already exists
        const isUserExist = await User.findOne({
            where: { email: email },
        });

        if (!isUserExist) {
            // Hash the password
            const hashedPassword = hashPassword(password);

            // Assign default role
            const role_default = await Role.findOne({
                where: { role_name: "CUSTOMER" },
            });

            console.log(role_default.role_id);

            // Create the user
            const user = await User.create({
                email,
                password: hashedPassword,
                phone,
                firstname,
                lastname,
                dob,
                gender,
                role_id: role_default.role_id,
            });

            await transaction.commit();

            res.status(200).json({
                code: 200,
                message: "Register successfully!",
            });
        } else {
            res.status(400).json({
                code: 400,
                message: "This email has already been used to register another account.",
            });
        }
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({
            error: "An error occured during register!",
        });
    }
};
