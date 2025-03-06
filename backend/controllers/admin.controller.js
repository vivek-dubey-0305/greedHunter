import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import ErrorHandler from "../middleware/error.middleware.js";
import { Admin } from "../models/admin.model.js";
import { Event } from "../models/event.model.js";
import { Quiz } from "../models/quiz.model.js";
// import { User } from "../models/user.model.js";


const adminUsage = asyncHandler(async (req, res, next) => {
    const { adminName, adminPassword } = req.body;
    // console.log("REQBOSY", req.body)
    if (!adminName || !adminPassword) {
        console.error("Please provide all fields")
        return next(new ErrorHandler("All Fields are required", 400))
    }

    // console.log("Admin found", admin)
    // console.log(Boolean(admin))
    // if (!admin) {
    //     console.error("No admin Found ..creating One")
    //     admin = await Admin.create({
    //         adminName,
    //         adminPassword
    //     })

    //     await admin.save()

    //     console.log("Admin created and saved")

    //     return res.status(201).json({
    //         success: true,
    //         message: "Admin Created",
    //         admin: admin.adminName
    //     })
    // }

    try {
        let admin = await Admin.findOne({ adminName })
        // console.log("adminName:", adminName)
        // console.log("admin.adminName:", admin.adminName)
        if (!admin) {
            // console.log("Name X")
            return next(new ErrorHandler("Invalid credentials", 400))
        }
        const isPasswordValid = await admin.isPasswordCorrect(adminPassword);

        if (!isPasswordValid) {
            // console.log("Passworx X")
            return next(new ErrorHandler("Invalid credentials", 400))
        }

        return res.status(200).json({
            success: true,
            message: "Welcome back admin",
            admin: admin.adminName
        })
    } catch (error) {
        console.error("Some error occured while logging admin")
        return next(new ErrorHandler(`Some error occured whilelogging admin : ${error}`, 400))
    }



})

const createQuizData = asyncHandler(async (req, res, next) => {
    try {
        const { question, options, correctOption } = req.body;
        // console.log("req.boy..\n", req.body)

        if (!question || !options || correctOption === undefined) {
            return next(new ErrorHandler("All Fields are required!", 400))
        }

        // Validate options (should be an array & have at least 2 choices)
        if (!Array.isArray(options) || options.length < 2) {
            return next(new ErrorHandler("Options must be an array with at least 2 choices!", 400));
        }


        // Validate correctOption (should be a valid index)
        if (typeof correctOption !== "number" || correctOption < 0 || correctOption >= options.length) {
            return next(new ErrorHandler("Correct option index must be within options range!", 400));
        }

        const quiz = await Quiz.create({
            question,
            options,
            correctOption,
        })

        await quiz.save()

        return res.status(201).json({
            success: true,
            message: `quizQuestion Created!`,
            quiz
        });
    } catch (error) {
        // console.error("Some error occured while creating quizData..\n", error)
        return next(new ErrorHandler("Some error occured while creating quizData..", 400))
    }
})


// *EVENT______________________________________________________
const createEvent = asyncHandler(async (req, res, next) => {
    const { title, description, eventType, category, startTime, endTime, location, rules, rewardDetails, socialLinks } = req.body;

    // ✅ Validate required fields
    if (!title || !description || !eventType || !category || !startTime || !endTime) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }

    // ✅ Create and save event
    const event = await Event.create({
        title,
        description,
        eventType,
        category,
        startTime,
        endTime,
        location: eventType === "physical" ? location : null, // Ensure location is only stored for physical events
        rules,
        rewardDetails,
        socialLinks
    });

    res.status(201).json({
        success: true,
        message: "Event created successfully",
        event
    });
});

export {
    adminUsage,
    createQuizData,
    createEvent,
}

