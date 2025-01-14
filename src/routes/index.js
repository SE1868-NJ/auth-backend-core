import authRouter from "./auth.route.js";

const route = (app) => {
    app.use("/api/v1/auth", authRouter);
};

export default route;
