import { Role } from "../models/role.model.js";
import { User } from "../models/user.model.js";

export const getOperators = (req, res) => {
    User.findAll({
        where: {
            role_id: 3,
        },
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
            res.status(401).json({
                message: "Invalid",
            });
        }

        const operatorRole = await Role.findOne({ where: { role_id: 3 } });

        if (!operatorRole) {
            res.status(401).json({
                message: "Operators roll not found!",
            });
        }

        const newUsers = await User.create({
            firstname,
            lastname,
            email,
            password,
            phone,
            dob,
            gender,
            role_id: 3,
        });

        res.status(200).json({
            message: "Create operators successfully!",
            user: newUsers,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const fieldToUpdate = req.body;
        console.log("fieldToUpdate: ", fieldToUpdate);

        if (Object.keys(fieldToUpdate).length === 0) {
            return res.status(400).json({
                error: "No field to update",
            });
        }

        try {
            const user = User.findByPk(id);
            if (!user) {
                return res.status(404).json({
                    error: "User not found!",
                });
            }

            try {
                const updatedUser = await User.update(fieldToUpdate, {
                    where: {
                        id: req.id,
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
