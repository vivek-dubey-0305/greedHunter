import express from "express";
import { config } from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import quizRouter from "./routes/quiz.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";



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



app.use("/api/v1/users", userRouter)
app.use("/api/v1/quiz", quizRouter)

app.use(errorMiddleware)


export { app };