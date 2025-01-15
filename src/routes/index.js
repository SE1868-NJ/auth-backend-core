import authRouter from "./auth.route.js";
import operatorsRouter from "./operators.route.js";

const route = (app) => {
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/operators", operatorsRouter);
};

export default route;
