import bcrypt from "bcrypt";
import { Operator } from "./models/operator.model.js";

const insertOperators = async () => {
    try {
        const operators = [
            {
                operatorName: "John Doe",
                mail: "john.doe@example.com",
                password: "password123",
            },
            {
                operatorName: "Alice Smith",
                mail: "alice.smith@example.com",
                password: "securePass456",
            },
            {
                operatorName: "Bob Johnson",
                mail: "bob.johnson@example.com",
                password: "myStrongPass789",
            },
            {
                operatorName: "Emily Davis",
                mail: "emily.davis@example.com",
                password: "emilyPass@2024",
            },
            {
                operatorName: "Michael Brown",
                mail: "michael.brown@example.com",
                password: "mikeSuperSecure1",
            },
            {
                operatorName: "Admin",
                mail: "admin@gmail.com",
                password: "123456789",
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

insertOperators();
