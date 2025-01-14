import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import { User } from "../models/user.model.js";
const bcrypt = require("bcryptjs");
const authService = require("../service/auth.service.js");

export const login = (req, res) => {
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
                (user) => user.email === email && user.password === password,
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

// Function to hash password
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(8); // Generate a unique salt for each password
    return bcrypt.hashSync(password, salt);
};

export const register = async (req, res) => {
    try {
        const { email, password, phone, firstname, lastname, dob, gender, status } =
            userCreationRequest;

        // Check if the user already exists
        const isUserExist = await db.User.findOne({
            where: { email: email },
        });

        if (!isUserExist) {
            // Hash the password
            const hashedPassword = hashPassword(password);

            // Create the user
            const user = await db.User.create({
                email,
                password: hashedPassword,
                phone,
                firstname,
                lastname,
                dob,
                gender,
                status,
            });

            // Assign default role
            const role_default = await db.Role.findOne({
                where: { role_name: "USER" },
            });

            if (role_default) {
                await user.addRole(role_default); // Make sure `addRole` is correctly set in associations
            }

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
        res.status(500).json({
            error: "An error occured during login!",
        });
    }
};
