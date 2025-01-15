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

export const createOperators = (req, res) => {
    // try {
    //     const { firstname, lastname, email, password, phone, dob, gender } = req.body;
    //     const newUsers = await User.create({
    //         firstname,
    //         lastname,
    //         email,
    //         password,
    //         phone,
    //         dob,
    //         gender,
    //     });
    // } catch (error) {
    // }
    // User.findAll({
    //     where: {
    //         role_id: 3,
    //     },
    // }).then((users) => {
    //     res.status(200).json({
    //         operators: users
    //     })
    // })
    //     .catch((err) => {
    //         res.status(500).json({
    //             error: "An error occured during login!",
    //         });
    //     });
    // res.status(200).json({
    //     message: "create operators",
    // });
};
