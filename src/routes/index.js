import authRouter from "./auth.route.js";
import roleRouter from "./role.route.js";

const route = (app) => {
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/roles", roleRouter);
};

export default route;
