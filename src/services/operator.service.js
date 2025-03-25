import bcrypt from "bcrypt";
import { Operator } from "../models/operator.model.js";

const OperatorServices = {
    async checkOPerator(email, password) {
        try {
            const operator = await Operator.findOne({
                where: { email },
            });
            if (!operator) {
                return null;
            }
            const validPassword = await bcrypt.compare(password, operator.password);
            if (!validPassword) {
                return null;
            }
            return operator;
        } catch (error) {
            console.error("Error checking operator:", error);
            return null;
        }
    },
};

export default OperatorServices;
