import express from "express";
import { getUsers, register, updateMarks } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/updateUserMarks").post(updateMarks);
router.route("/getUsers").get(getUsers);



export default router;
