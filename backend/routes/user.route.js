import express from "express";
import { completeProfile, enrollUserInEvent, getAllEvents, getEventById, getquizQuestions, getUSer, getUsers, login, logout, refreshAccessToken, register, snedOTP, updateMarks, verifyOTP } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = express.Router();

// *USER ROUTES____________________________________________________
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/sendOtp").post(snedOTP);
router.route("/verifyOtp").post(verifyOTP);

router.route("/getUser").get(verifyJWT, getUSer)
router.route("/completeProfile").post(verifyJWT, completeProfile)

router.route("/enrollUser").post(verifyJWT, enrollUserInEvent)

router.route("/refreshToken").post(refreshAccessToken)

router.route("/logout").post(verifyJWT, logout)
router.route("/updateUserMarks").post(updateMarks);
router.route("/getUsers").get(getUsers);


// *QUIZ ROUTES____________________________________________________
router.route("/getquizQuestions").get(getquizQuestions)

// *EVENT ROUTES____________________________________________________
router.route("/getEvent/:eventId").get(getEventById)
router.route("/getAllEvents").get(getAllEvents)



export default router;
