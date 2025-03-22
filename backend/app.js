import express from "express";
import { config } from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import leaderboardRouter from "./routes/leaderboard.route.js"
import { errorMiddleware } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";


import { createServer } from "http";   // ✅ Import HTTP Server
import { Server } from "socket.io";


const app = express();

const server = createServer(app);  // ✅ Create an HTTP server for WebSockets
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,  // ✅ Allow frontend to connect
        credentials: true
    }
});

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

// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || origin === process.env.CORS_ORIGIN) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true
// }));

app.use(cookieParser());
const allowedOrigins = process.env.CORS_ORIGIN.split(",");



app.use(cors({
    origin: (origin, callback) => {
        if (!origin ||allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },  
    credentials: true
}));



app.use("/api/v1/users", userRouter)
// app.use("/api/v1/quiz", quizRouter)
app.use("/api/v1/admin", adminRouter)
// app.use("/api/v1/leaderboard", leaderboardRouter);

app.use(errorMiddleware)

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// ✅ Export `server` instead of `app`
export { server, io };


// export { app };