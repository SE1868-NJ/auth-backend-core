import bcrypt from "bcrypt";
import { Admin } from "./models/admin.model.js";
import { Operator } from "./models/operator.model.js";

const insertOperators = async () => {
    try {
        const operators = [
            {
                firstName: "Nguyễn",
                lastName: "Văn A",
                email: "operator@gmail.com",
                personalEmail: "abc@gmail.com",
                password: "12345",
                phoneNumber: "0987654321",
                dateOfBirth: "1990-05-20",
                gender: "male",
                status: "active",
                roleCode: 1,
            },
        ];
        // Hash passwords
        for (const operator of operators) {
            const salt = await bcrypt.genSalt(10);
            operator.password = await bcrypt.hash(operator.password, salt);
        }

        // Insert data
        await Operator.bulkCreate(operators);
        console.log("5 Operators inserted successfully!");
    } catch (error) {
        console.error("Error inserting operators:", error);
    }
};

const insertAdmins = async () => {
    try {
        const admins = [
            {
                firstname: "Trần",
                lastname: "Thị B",
                email: "admin@gmail.com",
                password: "12345",
                phone: "0912345678",
                dob: "1985-08-15",
                gender: "female",
                status: "active",
            },
        ];

        // Hash passwords
        for (const admin of admins) {
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(admin.password, salt);
        }

        // Insert data
        await Admin.bulkCreate(admins);
        console.log("Admins inserted successfully!");
    } catch (error) {
        console.error("Error inserting operators:", error);
    }
};

const insert = async () => {
    console.log("insert started----------");
    await insertOperators();
    // await insertAdmins();
};

insert();
