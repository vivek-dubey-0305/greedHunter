import express from "express";
import { getCategoryRanking, getEnrolledEventHistory, getHeadToHeadComparison, getOverallRanking, getSubcategoryRanking } from "../controllers/leaderboard.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = express.Router();
// *ADMIN______-----
router.route("/overall").get(verifyJWT, getOverallRanking)
router.route("/category/:category").get(verifyJWT, getCategoryRanking)
router.route("/subcategory/:category/:subcategory").get(verifyJWT,getSubcategoryRanking)
router.route("/head-to-head/:opponentId").get(verifyJWT,getHeadToHeadComparison)
router.route("/history").get(verifyJWT,getEnrolledEventHistory)
// router.route("/isAdmin").get(adminUsage)


export default router;
