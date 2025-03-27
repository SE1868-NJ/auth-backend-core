
import { Admin } from "../models/admin.model.js";
import { Operator } from "../models/operator.model.js";
import { Role } from "../models/role.model.js";
import OperatorServices from "../services/operator.service.js";
import { hashPassword } from "../utils/index.js";
import { sendEmail } from "../utils/mail.utils.js";
import bcrypt from "bcrypt";

export const getOperators = (req, res) => {
    Operator.findAll({
        where: {},
    })
        .then((users) => {
            res.status(200).json({
                operators: users,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: "An error occured during get operators!",
            });
        });
};

export const createOperators = async (req, res) => {
    try {
        const { firstName, lastName, personalEmail, email, phoneNumber, dateOfBirth, gender, roleCode } = req.body;
        console.log(firstName, lastName, personalEmail, email, phoneNumber, dateOfBirth, gender, roleCode);

        if (!firstName || !lastName || !email || !phoneNumber || !dateOfBirth || !gender) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin!" });
        }

        const existingOperator = await Operator.findOne({ where: { email } });

        if (!existingOperator) {
            return res.status(404).json({ message: "Operator role not found!" });
        }

        const generatePassword = (length = 12) => {
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
            return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
        };

        const plainPassword = generatePassword(); // Generate password
        const hashedPassword = await bcrypt.hash(plainPassword, 10); // Hash password securely

        const newOperator = await Operator.create({
            firstName,
            lastName,
            personalEmail,
            email,
            password: hashedPassword,
            phoneNumber,
            dateOfBirth,
            gender
        });

        sendEmail(
            {
                to: personalEmail,
                subject: "Thông tin đăng ký tài khoản",
                text:
                    `Email Operator: ${email} \nMật khẩu:  ${plainPassword}`,
            }
        );

        return res.status(201).json({
            message: "Operator created successfully!",
            user: newUser,
        });


    } catch (error) {
        console.error("Error creating operator:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const fieldsToUpdate = req.body;

        if (Object.keys(fieldsToUpdate).length === 0) {
            return res.status(400).json({
                error: "No field to update",
            });
        }

        try {
            const user = await Admin.findByPk(id);
            if (!user) {
                return res.status(404).json({
                    error: "User not found!",
                });
            }

            try {
                const updatedUser = await Admin.update(fieldsToUpdate, {
                    where: {
                        user_id: id,
                    },
                }).then((user) => {
                    res.status(200).json({
                        message: "Update user successfully",
                        user: user,
                    });
                });
            } catch (error) {
                return res.status(500).json({
                    error: `An error occured during update user! ${error}.`,
                });
            }
        } catch (error) {
            return res.status(500).json({
                error: `An error occured during find user by PK! ${error}.`,
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: `Request not found! ${error}.`,
        });
    }
};


export const getOperatorsList = async (req, res) => {
    try {
        const operators = await OperatorServices.getAllOperators();
        res.status(200).json({ success: true, data: operators });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getOperatorById = async (req, res) => {
    try {
        const { id } = req.params;
        const operator = await OperatorServices.getOperatorById(id);

        if (!operator) {
            return res.status(404).json({ success: false, message: "Operator not found" });
        }

        res.status(200).json({ success: true, data: operator });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching operator", error: error.message });
    }
};