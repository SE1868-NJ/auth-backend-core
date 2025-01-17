import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        // Step 1: Fetch user data from the database
        const users = await User.findAll();

        // Step 2: Return the data to the client
        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users,
        });
    } catch (error) {
        // Handle errors gracefully
        console.error("Error fetching users:", error);

        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching users. Please try again later.",
            error: error.message,
        });
    }
};
