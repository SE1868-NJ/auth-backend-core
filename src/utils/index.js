import bcrypt from "bcryptjs";
// Function to hash password
export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(8); // Generate a unique salt for each password
    return bcrypt.hashSync(password, salt);
};
