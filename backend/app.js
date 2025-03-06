import express from "express";
import { config } from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";



const app = express();
config({ path: "./.env" })

// app.use(express.json);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
// console.log(process.env.CORS_ORIGIN)
// app.use(
//     cors({
//         origin: process.env.CORS_ORIGIN,
//         credentials: true

//     })
// )

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin === process.env.CORS_ORIGIN) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(cookieParser());


app.use("/api/v1/users", userRouter)
// app.use("/api/v1/quiz", quizRouter)
app.use("/api/v1/admin", adminRouter)

app.use(errorMiddleware)


export { app };