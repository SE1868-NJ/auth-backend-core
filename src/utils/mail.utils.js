import nodemailer from "nodemailer";

//config smtp
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "he186184tranxuanchien@gmail.com",
        pass: "psnl rmpj tsqt koks",
    },
});

export const sendEmail = async (mailInfo) => {
    const { to, subject, text } = mailInfo;

    try {
        const mailOptions = {
            from: "he186184tranxuanchien@gmail.com",
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        console.log("mail sent successfully");
    } catch (err) {
        console.log("mail sent faled: ", err);
        throw err;
    }
};
