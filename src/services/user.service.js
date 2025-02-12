import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

const UserServices = {
    async checkUser(email, password) {
        try {
            const user = await User.findOne({
                where: { email },
            });
            if (!user) {
                return { error: "Invalid credentials" };
            }
            const validPassword = await bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return { error: "Invalid credentials" };
            }
            return user;
        } catch (error) {
            console.error("Error checking operator:", error);
            return null;
        }
    },
};

export default UserServices;
