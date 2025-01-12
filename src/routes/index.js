import authRouter from "./auth.route.js";

const route = (app) => {
    app.use("/auth", authRouter);
};

export default route;
