import mongoose from "mongoose";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import ErrorHandler from "../middleware/error.middleware.js";
import { Admin } from "../models/admin.model.js";
import { EventCategory } from "../models/event.model.js";
import { DynamicData } from "../models/quiz.model.js";
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
        // console.error("No admin Found ..creating One")
        // admin = await Admin.create({
            //     adminName,
            //     adminPassword
            // })
            
            // await admin.save()
            
            // console.log("Admin created and saved")
            
            // return res.status(201).json({
                //     success: true,
                //     message: "Admin Created",
                //     admin: admin.adminName
                // })
                //     return next(new ErrorHandler("You aren't a admin lil boy", 403))
                // }
                
    try {
        const admin = await Admin.findOne({ adminName })
        // let admin = await Admin.findOne({ adminName })
        // console.log("adminName:", adminName)
        // console.log("admin.adminName:", admin.adminName)
        if (!admin) {
            // console.log("Name X")
            return next(new ErrorHandler("You aren't a admin lil boy", 403))
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

// const createQuizData = asyncHandler(async (req, res, next) => {
//     try {
//         const { question, options, correctOption } = req.body;
//         // console.log("req.boy..\n", req.body)

//         if (!question || !options || correctOption === undefined) {
//             return next(new ErrorHandler("All Fields are required!", 400))
//         }

//         // Validate options (should be an array & have at least 2 choices)
//         if (!Array.isArray(options) || options.length < 2) {
//             return next(new ErrorHandler("Options must be an array with at least 2 choices!", 400));
//         }


//         // Validate correctOption (should be a valid index)
//         if (typeof correctOption !== "number" || correctOption < 0 || correctOption >= options.length) {
//             return next(new ErrorHandler("Correct option index must be within options range!", 400));
//         }

//         const quiz = await Quiz.create({
//             question,
//             options,
//             correctOption,
//         })

//         await quiz.save()

//         return res.status(201).json({
//             success: true,
//             message: `quizQuestion Created!`,
//             quiz
//         });
//     } catch (error) {
//         // console.error("Some error occured while creating quizData..\n", error)
//         return next(new ErrorHandler("Some error occured while creating quizData..", 400))
//     }
// })


// *EVENT______________________________________________________

// Controller to insert multiple quiz questions at once
const addBulkQuizQuestions = asyncHandler(async (req, res, next) => {
    try {
        const { subCategory, questions } = req.body;

        if (!subCategory || !Array.isArray(questions) || questions.length === 0) {
            return next(new ErrorHandler("Invalid input data", 400));
        }

        // Validate each question structure
        for (let q of questions) {
            if (!q.question || !Array.isArray(q.options) || q.options.length < 2 || q.options.length > 5 || q.correctOption === undefined) {
                return next(new ErrorHandler("Invalid question format", 400));
            }
        }

        // Insert quiz data into the dynamic schema
        const quizEntry = new DynamicData({
            category: "Quiz",
            subCategory,
            data: { questions },
        });

        await quizEntry.save();

        res.status(201).json({ message: "Quiz questions added successfully!", quizEntry });

    } catch (error) {
        console.error("Error adding quiz:", error);
        return next(new ErrorHandler("Internal server error", 500));
    }
});

// const createEvent = asyncHandler(async (req, res, next) => {
//     const { title, description, eventType, category, startTime, endTime, location, rules, rewardDetails, socialLinks } = req.body;

//     // ✅ Validate required fields
//     if (!title || !description || !eventType || !category || !startTime || !endTime) {
//         return next(new ErrorHandler("Please provide all required fields", 400));
//     }

//     // ✅ Create and save event
//     const event = await EventCategory.create({
//         title,
//         description,
//         eventType,
//         category,
//         startTime,
//         endTime,
//         location: eventType === "physical" ? location : null, // Ensure location is only stored for physical events
//         rules,
//         rewardDetails,
//         socialLinks
//     });

//     res.status(201).json({
//         success: true,
//         message: "Event created successfully",
//         event
//     });
// });

// const createEvent = asyncHandler(async (req, res, next) => {
//     const { title, description, eventType, category, subcategory, startTime, endTime, location, price, isFree, rules, rewardDetails, socialLinks } = req.body;

//     if (!title || !description || !eventType || !category || !subcategory || !startTime || !endTime) {
//         return next(new ErrorHandler("Please provide all required fields", 400));
//     }

//     let eventCategory = await EventCategory.findOne({ category });

//     if (!eventCategory) {
//         eventCategory = new EventCategory({ category, subcategories: {} });
//     }

//     if (!eventCategory.subcategories.has(subcategory)) {
//         eventCategory.subcategories.set(subcategory, []);
//     }

//     const newEvent = {
//         title,
//         description,
//         eventType,
//         startTime,
//         endTime,
//         location: eventType === "physical" ? location : null,
//         price,
//         isFree,
//         rules,
//         rewardDetails,
//         socialLinks,
//         createdAt: new Date(),
//     };

//     eventCategory.subcategories.get(subcategory).push(newEvent);
//     await eventCategory.save();

//     res.status(201).json({
//         success: true,
//         message: "Event created successfully",
//         event: newEvent,
//     });
// });


const createEvent = asyncHandler(async (req, res, next) => {
    const {
        title, description, eventType, category, subcategory,
        startTime, endTime, location, price, isFree, rules, rewardDetails, socialLinks
    } = req.body;

    if (!title || !description || !eventType || !category || !subcategory || !startTime || !endTime) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }

    try {
        let eventCategory = await EventCategory.findOne({ category });

        if (!eventCategory) {
            eventCategory = new EventCategory({ category, subcategories: {} });
        }

        // Ensure subcategory exists in the object
        if (!eventCategory.subcategories[subcategory]) {
            eventCategory.subcategories[subcategory] = [];
        }

        // Create new event
        const newEvent = {
            _id: new mongoose.Types.ObjectId(), // ✅ Auto-generate unique ID
            title,
            description,
            eventType,
            startTime,
            endTime,
            location: eventType === "physical" ? location : null,
            price,
            isFree,
            rules: Array.isArray(rules) ? rules : rules.split(",").map(r => r.trim()),
            rewardDetails,
            socialLinks: Array.isArray(socialLinks) ? socialLinks : socialLinks.split(",").map(link => link.trim()),
            createdAt: new Date(),
        };

        // Push new event into the subcategory array
        eventCategory.subcategories[subcategory].push(newEvent);

        // ✅ Force Mongoose to detect change
        eventCategory.markModified("subcategories");

        // Save the updated category
        await eventCategory.save();

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            event: newEvent,
        });

    } catch (error) {
        return next(new ErrorHandler(`Error creating event: ${error.message}`, 500));
    }
});





export {
    adminUsage,
    // createQuizData,
    addBulkQuizQuestions,
    createEvent,
}

