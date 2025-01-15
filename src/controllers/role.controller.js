import { Role } from "../models/role.model.js";

export const getAllRoles = async (req, res) => {
    try {
        //get all Role from db
        const roles = await Role.findAll();
        res.status(200).json({
            roles: roles,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// const test = async() => {
//     const roles = await Role.findAll();
//     console.log(roles)
// }

// test()
