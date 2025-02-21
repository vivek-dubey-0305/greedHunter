import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import ErrorHandler from "../middleware/error.middleware.js";
import { Quiz } from "../models/quiz.model.js";
// import { User } from "../models/user.model.js";

const quizData = asyncHandler(async (req, res, next) => {
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


const getquizQuestions = asyncHandler(async (req, res, next) => {
    try {
        const questions = await Quiz.find();
        res.status(200).json({ questions });


    } catch (error) {
        return next(new ErrorHandler("Error fetching questions", 500))

    }
})
// app.get("/getquizQuestions", async (req, res) => {
//     try {
//       const questions = await Quiz.find();
//       res.status(200).json({ questions });
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching questions" });
//     }
//   });




export {
    quizData,
    getquizQuestions
}

