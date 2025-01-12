import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import { User } from "../models/user.model.js";

export const login = (req, res) => {
    // get email, password from user through request.body
    const { email, password } = req.body;
    // get all users from db
    User.findAll().then((users) => {
        // check user valid or not
        const isValid = users.some((user) => user.email === email && user.password === password);

        if (isValid) {
            const accessToken = jwt.sign(
                {
                    userInfo: "userInfo",
                },
                JWT_SECRET,
            );
            res.status(500).json({
                token: accessToken,
            });
        } else {
            res.status(401).json({
                message: "Invalid email, password!",
            });
        }
    });
};
