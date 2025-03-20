// import { app } from "./app.js"
import { server } from "./app.js";
import connectDB from "./database/dbConnection.js";


connectDB()
    .then(() => {
        server.listen(process.env.PORT || 8000, () => {
            console.log("SERVER IS LISTENING AT PORT : ");

        });
    })
    .catch((err) => {
        console.log("MONGODB CONNECTION FAILED !!", err);

    })
