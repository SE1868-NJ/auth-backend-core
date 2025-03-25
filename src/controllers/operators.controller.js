import { Admin } from "../models/admin.model.js";
import { Operator } from "../models/operator.model.js";
import { Role } from "../models/role.model.js";
import { hashPassword } from "../utils/index.js";

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
        const { firstname, lastname, email, password, phone, dob, gender } = req.body;

        if (!firstname || !lastname || !email || !password || !phone || !dob || !gender) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const operatorRole = await Role.findOne({ where: { role_id: 3 } });

        if (!operatorRole) {
            return res.status(404).json({ message: "Operator role not found!" });
        }

        const newUser = await Admin.create({
            firstname,
            lastname,
            email,
            password: hashPassword(password),
            phone,
            dob,
            gender,
        });

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
