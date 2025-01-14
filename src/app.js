const PORT = 3000;
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import db from "./models/index.js";
import { User } from "./models/user.model.js";
import route from "./routes/index.js";

const app = express();
const corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));

// setup terminal logger
app.use(morgan("combined"));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

/* check db connection */
try {
    await db.sequelize.authenticate();
    console.log("Database connected successfully!");
} catch (error) {
    console.error("Error occurs when connecting to database!", error);
}

app.get("/select", (req, res) => {
    res.status(200).json({
        message: "get users success!",
    });
});

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on http://localhost:${PORT}`);
    } else {
        console.log("Error occurred, server can not start", err);
    }
});

route(app);
