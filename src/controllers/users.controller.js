import { User } from "../models/user.model.js";
import { hashPassword } from "../utils/index.js";

export const changePassword = async (req, res) => {
    try {
        const { userId, password, newPassword } = req.body;

        // Validate input
        if (!userId || !password || !newPassword) {
            return res.status(400).json({
                errorCode: 1,
                message: "Missing userId, password, or newPassword!",
            });
        }

        // Find user by ID
        const user = await User.findOne({ where: { user_id: userId } });

        if (!user) {
            return res.status(404).json({
                errorCode: 2,
                message: "User not found!",
            });
        }

        // Validate current password
        if (user.password !== hashPassword(password)) {
            return res.status(401).json({
                errorCode: 3,
                message: "Invalid current password!",
            });
        }
        
        // Update password
        user.password = hashPassword(newPassword);
        await user.save();

        return res.status(200).json({
            errorCode: 0,
            message: "Password changed successfully!",
        });
    } catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({
            errorCode: 4,
            message: "An error occurred while changing the password.",
            error: error.message,
        });
    }
};
