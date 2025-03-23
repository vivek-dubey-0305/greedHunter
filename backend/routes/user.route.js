import express from "express";
import { changeCurrentPassword, completeProfile, deleteUser, enrollUserInEvent, getAllEvents, getEventById, getQuizBySubCategory, getUSer, getUsers, login, logout, refreshAccessToken, register, resetPassword, sendMailTotopTen, snedLink, snedOTP, updateMarks, updateProfile, userContactMail, verifyOTP } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = express.Router();

// *USER ROUTES____________________________________________________
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/sendOtp").get(verifyJWT, snedOTP);
router.route("/verifyOtp").post(verifyOTP);

router.route("/reset-password-link").post(snedLink)
router.route("/reset-password").post(resetPassword)

router.route("/getUser").get(verifyJWT, getUSer)
router.route("/completeProfile").post(verifyJWT, completeProfile)

router.route("/updateProfile").post(verifyJWT, updateProfile)



router.route("/enrollUser").post(verifyJWT, enrollUserInEvent)

router.route("/refreshToken").post(refreshAccessToken)

router.route("/logout").post(verifyJWT, logout)
router.route("/updateUserMarks").post(verifyJWT,updateMarks);
router.route("/getUsers").get(getUsers);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/delete-account").get(verifyJWT, deleteUser);


// *QUIZ ROUTES____________________________________________________
router.route("/getquizQuestions/:category/:subcategory").get(getQuizBySubCategory)

// *EVENT ROUTES____________________________________________________
router.route("/getEvent/:category/:subcategory/:eventId").get(getEventById)
router.route("/getAllEvents").get(getAllEvents)


router.route("/sendMailToTopTen").get(sendMailTotopTen)
router.route("/sendMailToHunter").post(userContactMail)


export default router;
