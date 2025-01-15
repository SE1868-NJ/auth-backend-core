import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import { User } from "../models/user.model.js";

export const getSession = (req, res) => {
    res.status(200).json({
        message: "Authenticated!",
    });
};

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
