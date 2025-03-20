import express from "express";
// import { register } from "../controllers/user.controller";
// import { quizData } from "../controllers/quiz.controller.js";
import { addBulkQuizQuestions, adminUsage, createEvent } from "../controllers/admin.controller.js";

const router = express.Router();
// *ADMIN______-----
router.route("/isAdmin").post(adminUsage)

// *CREATE QUIZ
router.route("/createQuizQuestions").post(addBulkQuizQuestions);
// router.route("/getquizQuestions").get(getquizQuestions)


// *CREATE EVENT
router.route("/createEvent").post(createEvent);


export default router;
