import nodemailer from "nodemailer";

//config smtp
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "khuyen.dev183@gmail.com",
        pass: "ulsh zrod lfmf vdgo",
    },
});

export const sendEmail = async (mailInfo) => {
    const { to, subject, text } = mailInfo;

    try {
        const mailOptions = {
            from: "khuyen.dev183@gmail.com",
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
