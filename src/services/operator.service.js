import bcrypt from "bcrypt";
import { Operator } from "../models/operator.model.js";

const OperatorServices = {
    async checkOperator(email, password) {
        try {
            const operator = await Operator.findOne({ where: { email } });
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

    async getAllOperators() {
        try {
            return await Operator.findAll();
        } catch (error) {
            console.error("Error fetching operators:", error);
            throw new Error("Failed to fetch operators");
        }
    },

    async getOperatorById(id) {
        try {
            return await Operator.findOne({ where: { operatorID: id } });
        } catch (error) {
            console.error("Error fetching operator by ID:", error);
            throw new Error("Failed to fetch operator");
        }
    },

    async createOperator(data) {
        try {
            data.password = await bcrypt.hash(data.password, 10); // Mã hóa mật khẩu
            const newOperator = await Operator.create(data);
            return newOperator;
        } catch (error) {
            console.error("Error creating operator:", error);
            throw new Error("Failed to create operator");
        }
    },

    async updateOperator(id, data) {
        try {
            const operator = await Operator.findByPk(id);
            if (!operator) {
                return { error: "Operator not found" };
            }
            if (data.password) {
                data.password = await bcrypt.hash(data.password, 10);
            }
            await operator.update(data);
            return operator;
        } catch (error) {
            console.error("Error updating operator:", error);
            throw new Error("Failed to update operator");
        }
    }
};

export default OperatorServices;
