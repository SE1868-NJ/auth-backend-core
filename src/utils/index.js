import bcrypt from "bcryptjs";
// Function to hash password
export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(8); // Generate a unique salt for each password
    return bcrypt.hashSync(password, salt);
};

export const decodeJWT = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map((c) => {
                return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
            })
            .join(""),
    );

    return JSON.parse(jsonPayload);
};
