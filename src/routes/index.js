import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";

const route = (app) => {
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/users", userRouter);
};

export default route;
