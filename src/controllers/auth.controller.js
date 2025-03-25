import bcrypt from "bcryptjs";
import cryptoRandomString from "crypto-random-string";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import sequelize from "../config/sequelize.config.js";
import { Admin } from "../models/admin.model.js";
import { Role } from "../models/role.model.js";
import OperatorServices from "../services/operator.service.js";
import UserServices from "../services/user.service.js";
import { hashPassword } from "../utils/index.js";
import { sendEmail } from "../utils/mail.utils.js";

export const getSession = (req, res) => {
    res.status(200).json({
        message: "Authenticated!",
    });
};

export const login = async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;
        // Extract role from request parameters (e.g., "/login/operator" or "/login/user")
        const { role } = req.params;

        console.log("role", role);
        // Validate that email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        let user = null; // Initialize user variable to store authentication result

        // Check user credentials based on role
        if (role === "operator") {
            user = await OperatorServices.checkOPerator(email, password);
        } else if (role === "user") {
            user = await UserServices.checkUser(email, password);
        } else {
            // Return error if an invalid role is provided
            return res.status(400).json({ message: "Invalid role specified!" });
        }
        console.log(user);

        // If user authentication fails, return an error response
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password!" });
        }

        // Generate JWT token with user email and role, valid for 1 hour
        const accessToken = jwt.sign({ email, role }, JWT_SECRET, { expiresIn: "1h" });

        // Return the generated token in the response
        return res.status(200).json({ token: accessToken });
    } catch (error) {
        // Log the error to the server console for debugging
        console.error("Login Error:", error);
        // Return a generic error response to avoid exposing sensitive details
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const register = async (req, res) => {
    const transaction = await sequelize.transaction(); // bắt đầu 1 transaction
    try {
        const { email, password, phone, firstname, lastname, dob, gender } = req.body;

        // Check if the user already exists
        const isUserExist = await Admin.findOne({
            where: { email: email },
        });

        if (!isUserExist) {
            // Hash the password
            const hashedPassword = hashPassword(password);

            // Assign default role
            const role_default = await Role.findOne({
                where: { role_name: "CUSTOMER" },
            });

            // Create the user
            await Admin.create({
                email,
                password: hashedPassword,
                phone,
                firstname,
                lastname,
                dob,
                gender,
                role_id: role_default.role_id,
            }).then(async () => {
                await sendOtp(email);
            });

            await transaction.commit();

            res.status(200).json({
                code: 200,
                message: "Register successfully!",
            });
        } else {
            res.status(409).json({
                // Mã lỗi tài khoản đã tồn tại
                code: 409,
                message: "This email has already been used to register another account.",
            });
        }
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({
            error: "An error occured during register!",
        });
    }
};

const otpStore = new Map(); // Bộ nhớ tạm thời lưu OTP
export const sendOtp = async (email) => {
    if (!email) {
        console.log("Please provide an email!");
        return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Tạo OTP
    const expiresAt = Date.now() + 5 * 60 * 1000; // Hết hạn sau 5 phút

    // Lưu OTP vào bộ nhớ tạm
    otpStore.set(email, { otp, expiresAt });

    // Gửi OTP qua email (sử dụng Nodemailer)
    try {
        await sendEmail({
            to: email,
            subject: "Verify your account",
            text: `OTP code: ${otp}`,
        }); // Hàm gửi email từ Nodemailer
    } catch (error) {
        console.log(error);
    }
};

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Please provide your email and OTP." });
    }

    const storedOtp = otpStore.get(email);

    // Kiểm tra OTP và thời gian hết hạn
    if (!storedOtp || storedOtp.otp !== otp) {
        return res.status(400).json({
            message: "Invalid OTP.",
        });
    }

    if (Date.now() > storedOtp.expiresAt) {
        return res.status(400).json({ message: "OTP has expired." });
    }

    // Xác thực thành công: Cập nhật trạng thái tài khoản
    await User.update(
        { status: "active" },
        {
            where: { email: email },
        },
    );

    otpStore.delete(email); // Xóa OTP khỏi bộ nhớ
    res.status(200).json({
        message: "OTP verification successful, your account has been activated!",
    });
};

export const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ message: "Please provide your email." });
        }

        // Generate random password
        const newPassword = cryptoRandomString({ length: 8, type: "alphanumeric" });
        const hashNewPassword = hashPassword(newPassword);

        // send new password to the user
        await sendEmail({
            to: email,
            subject: "Reset password",
            text: `OTP code: ${newPassword}`,
        });

        // update database
        await User.update(
            { password: hashNewPassword },
            {
                where: { email: email },
            },
        );

        res.status(200).json({
            message: "A new password has been sent to your email.",
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occur during reset password",
        });
    }
};
