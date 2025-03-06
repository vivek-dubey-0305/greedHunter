import { response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import ErrorHandler from "../middleware/error.middleware.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/mail.util.js";
import { Quiz } from "../models/quiz.model.js";
import { Event } from "../models/event.model.js";
import jwt from "jsonwebtoken";



function generateEmailTemplate(verificationCode) {
    return `
    <div>
      <span>
      ${verificationCode}
      </span>
    </div>
    `;
}

const register = asyncHandler(async (req, res, next) => {
    //* --------destructuring data & data from request --------------------
    const { username, fullName, email, phone, password } = req.body
    // console.log("req.body[registerUser]:\n", req.body)

    const requiredFields = [username, fullName, email, phone, password]
    // console.log("requiredFields", requiredFields)

    const checkFields = { username, email, phone }
    // console.log("Check Fields", checkFields)

    // *Required Fields_____________________________________________
    if (requiredFields.some((field) => field?.trim() === "")) {
        console.error("emptyError")
        return next(new ErrorHandler("All Fields are required", 400))
    }

    // function validatePhoneNumber(phone) {
    //     console.log("Validating...")
    //     const phoneRegEx = /^\+91\d{10}$/;
    //     return phoneRegEx.test(phone)
    // }


    // if (!validatePhoneNumber(phone)) {
    //     console.error("Invalid format number")
    //     return next(new ErrorHandler("Invalid Phone Number format", 400))
    // }


    // *--❓Remember object[key], the key will be string "", therefore it will be Object["key"] if do not wanna use the dot notations
    // * object.key === object["key"]
    //* --❓Converts an object into array {name:value} -> [['name','value']]
    // console.log(Object.entries(checkFields)) 
    //* --❓ loops through this array and converts each key-value pair into an object [['name','value']] -> [{name: 'value'}]
    // Object.entries(fields).map(([key, value]) => ({ [key]: value })) 

    // *Check for an existing User__________________________________________________
    const existingUser = await User.findOne({
        $or: Object.entries(checkFields).map(([key, value]) => ({ [key]: value }))
    })

    if (existingUser) {
        // console.log("ExistingUser")
        // console.log(existingUser)
        const duplicateField = Object.keys(checkFields).find(key => existingUser[key].toString().toLowerCase() === checkFields[key].toString().toLowerCase())
        // console.log("duplicateFiels:\n", duplicateField, checkFields[duplicateField], existingUser[duplicateField])
        return res.status(400).json({
            success: false,
            message: `User already exist with the same ${duplicateField}: "${checkFields[duplicateField]}"\nPlease try unique one!`,
            duplicateField
        })
        // return next(new ErrorHandler(`User already exist with the same ${duplicateField}: "${checkFields[duplicateField]}"\nPlease try unique one!`, 400))
    }

    try {
        const user = await User.create({
            username, fullName, email, phone, password
        })

        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        const options = {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,  // 7 days in milliseconds
            sameSite: "Strict"
        }

        const resUser = await User.findById(user._id).select("-password -refreshToken");

        return res.status(201).
            cookie("accessToken", accessToken, options)
            .
            cookie("refreshToken", refreshToken, options).
            json({
                success: true,
                message: "User created Successfully",
                user: resUser, accessToken, refreshToken
            })




    } catch (error) {
        console.error("Unable to createa and save user", error)
        return false
    }







});

const login = asyncHandler(async (req, res, next) => {
    const { usernameORemail, password } = req.body;
    // console.log("reqLogin:\n", req.body);
    if (!usernameORemail || !password) {
        console.error("Login all fields req")
        return next(new ErrorHandler("Please fill in all fields", 400));
    }

    const user = await User.findOne({
        $or: [
            { username: usernameORemail },
            { email: usernameORemail }
        ]
    })

    if (!user) {
        // console.error("No User")
        return next(new ErrorHandler("Invalid Credentials", 401))
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        // console.error("Passworx X")
        return next(new ErrorHandler("Invalid credentials", 400))
    }

    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const options = {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,  // 7 days in milliseconds
        sameSite: "Strict"
    }
    const resUser = await User.findById(user._id).select("-password -refreshToken");

    return res.status(200).
        cookie("accessToken", accessToken, options)
        .
        cookie("refreshToken", refreshToken, options).
        json({
            success: true,
            message: "User Logged in successfully",
            user: resUser, accessToken, refreshToken
        })
})

const logout = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user._id
        // console.log("userId..\n", userId)
        // console.log("req.user..logout\n", req.user._id)

        try {
            const user = await User.findByIdAndUpdate(
                userId,
                {
                    $set: { isVerified: false },
                    $unset: { refreshToken: "" } // ✅ Removes refreshToken field
                },

                {
                    new: true
                }
            )
            // console.log("USER UPDATE:\n", user)
        } catch (error) {
            console.error("Unable to logout USer:\n", error)
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({
                success: true,
                message: "User Logged Out Succeddfully!"
            })
    } catch (error) {
        // console.error("Logout Error:\n", error)
        return next(new ErrorHandler(`Error logout session :\n${error}`, 400))
    }
})

const snedOTP = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        // console.error(" Email not provided")
        return next(new ErrorHandler("Please provide the email to sned otp", 400))
    }
    const user = await User.findOne({ email })
    if (!user) {
        // console.error("Wrong Email")
        return next(new ErrorHandler("Please provide email used for account creation!"))
    }

    const OTP = await user.generateVerificationCode()
    // console.log("OTP: ", OTP)
    await user.save()

    try {

        const message = generateEmailTemplate(OTP);
        await sendEmail({
            email,
            subject: "YOUR VERIFICATION CODE",
            message
        })
        return res.status(200).json({
            success: true,
            message: `Email sent successfully to ${email}`
        })

    } catch (error) {
        // console.log("Email Error:\n", error)
        return next(new ErrorHandler(`Unable to send email to ${email}\n Error ${error}`, 400))
        // throw new ErrorHandler("Failed to send verification Code", 500)
    }
})

const verifyOTP = asyncHandler(async (req, res, next) => {
    const { email, otp } = req.body;
    // console.log("REQ otp", req.body)
    if (!email) {
        // console.error("Email X (verify)")
        return next(new ErrorHandler("Enter the email to recive OTP", 400))
    }


    if (!otp) {
        // console.error("Otp X (verify)")
        return next(new ErrorHandler(`Please enter OTP sent to you mail: ${email} to verify Email`, 400))
    }

    const user = await User.findOne({ email });

    if (!user) {
        // console.error("User not found")
        return next(new ErrorHandler("INVALID Email", 400))
    }
    // console.log("USER:\n", user)
    // console.log("User.verificationCode:", user.verificationCode)
    // console.log("User.verificationCode:", user.verificationCode === Number(otp))
    // console.log("User.verificationCode:", !user.verificationCode === Number(otp))
    // console.log("User.verificationCode:", !user.verificationCode !== Number(otp))

    if (!user.verificationCode || user.verificationCode !== Number(otp)) {
        // console.error("Invalid OTP")
        return next(new ErrorHandler("INVALID OTP", 400))
    }

    if (user.verificationCodeExpire < Date.now()) {
        // console.error("OTP Expired")
        return next(new ErrorHandler("OTP Expired", 400))
    }

    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    user.refreshToken = refreshToken;
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpire = undefined;

    await user.save({ validateBeforeSave: false });

    const options = {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        sameSite: "Strict"
    }

    const resUser = await User.findById(user._id).select("-password -refreshToken");
    return res.status(200).
        cookie("accessToken", accessToken, options)
        .
        cookie("refreshToken", refreshToken, options).
        json({
            success: true,
            message: `${email} verified successfully\nUser Created`,
            user: resUser, accessToken, refreshToken
        })
})


const getUSer = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user._id
        // console.log("userId..\n", userId)
        // console.log("req.user..getUser\n", req.user)


        // console.log("USER:\n", req.user)
        return res
            .status(200)
            .json({
                success: true,
                message: "User found Succeddfully!",
                user: req.user
            })



    } catch (error) {
        // console.log("Logout Error:\n", error)
        return next(new ErrorHandler(`Error logout session :\n${error}`, 400))
    }
})

const completeProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user
    const { username,
        fullName,
        email,
        phone,
        gender,
        studyLevel,
        schoolName,
        standard,
        rollNumber,
        collegeName,
        course,
        semester,
        enrollmentNumber,
        isProfileCompleted,
    } = req.body;

    // console.log("Update reqbody", req.body)

    // ✅ Find existing user
    const existingUser = await User.findById(userId);
    if (!existingUser) {
        return next(new ErrorHandler("User not found", 404));
    }


    // ✅ Prepare update data
    let updatedData = {
        username: username ?? existingUser.username,
        fullName: fullName ?? existingUser.fullName,
        email: email ?? existingUser.email,
        phone: phone ?? existingUser.phone,
        // isProfileCompleted: existingUser.isProfileCompleted,
        gender: gender ?? existingUser.gender,
        studyLevel: studyLevel ?? existingUser.studyLevel,
    };
    // console.log("IsP", existingUser.isProfileCompleted)
    // console.log("EUser", existingUser)
    if (existingUser.isProfileCompleted) {
        return next(new ErrorHandler("YOur profile is already complete, please go to update section if you need to update", 400))
    }

    if (!gender || !studyLevel) {
        // console.log("GEner,studyLevel X")
        return next(new ErrorHandler("Please provide all the fields", 400))
    }

    // ✅ Unset irrelevant fields when switching study levels
    let unsetFields = {};

    // ✅ If Study Level is "School", update School fields only
    if (studyLevel === "School") {
        if (!schoolName || !standard || !rollNumber) {
            // console.log("!SchoolName || !standard ||!rollNumber")
            return next(new ErrorHandler("Please provide all the fields", 400))
        }
        updatedData = {
            ...updatedData,
            schoolName: schoolName ?? existingUser.schoolName,
            standard: standard ?? existingUser.standard,
            rollNumber: rollNumber ?? existingUser.rollNumber,
        };
        unsetFields = { collegeName: "", course: "", semester: "", enrollmentNumber: "" };
    }

    // ✅ If Study Level is "College", update College fields only
    else if (studyLevel === "College") {
        if (!collegeName || !course || !semester || !enrollmentNumber) {
            // console.log("!collegeName || !course || !semester ||!enrollmentNumber")
            return next(new ErrorHandler("Please provide all the fields", 400))
        }
        updatedData = {
            ...updatedData,
            collegeName: collegeName ?? existingUser.collegeName,
            course: course ?? existingUser.course,
            semester: semester ?? existingUser.semester,
            enrollmentNumber: enrollmentNumber ?? existingUser.enrollmentNumber,
        };
        unsetFields = { schoolName: "", standard: "", rollNumber: "" };
    }

    // ✅ If Study Level is "Other", reset both School & College fields
    else if (studyLevel === "Other") {
        unsetFields = { schoolName: "", standard: "", rollNumber: "", collegeName: "", course: "", semester: "", enrollmentNumber: "" };
    }

    // ✅ Update user in the database
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updatedData, isProfileCompleted: true, $unset: unsetFields }, // ✅ Unset old fields
        { new: true, runValidators: true }
    ).select("-password -refreshToken");

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser
    });

})

// const enrollUserInEvent = asyncHandler(async (req, res, next) => {
//     // const { userId } = req.user;
//     const userId = req.user._id
//     const { eventId } = req.body;

//     const user = await User.findById(userId);

//     if (!user) return next(new ErrorHandler("User not found", 404))

//     const event = await Event.findById(eventId);
//     if (!event) return next(new ErrorHandler("Event not found", 404))
//     console.log("(user.enrolledEvents.enrolled)--:", user.enrolledEvents.enrolled)

//     // ✅ Check if the user is already enrolled in this specific event
//     // const isAlreadyEnrolled = user.enrolledEvents.some(enrolledEvent =>
//     //     enrolledEvent.eventId.toString() === eventId
//     // );



//     // if (isAlreadyEnrolled) return next(new ErrorHandler("User already enrolled in this event", 400));

//     console.log("EVENTID", user.enrolledEvents.some(enrolledEvent => enrolledEvent.eventId.toString()))
//     console.log("ENROLLEd", user.enrolledEvents.some(enrolledEvent => enrolledEvent.enrolled === true))

//     if ((user.enrolledEvents.some(enrolledEvent => enrolledEvent.eventId.toString() === eventId)) && (user.enrolledEvents.some(enrolledEvent => enrolledEvent.enrolled === true))) {
//         return next(new ErrorHandler("User already enrolled in this event", 400));
//     }

//     user.enrolledEvents.push({
//         eventId: event._id,
//         enrolled: true,
//         title: event.title,
//         category: event.category,
//         startTime: event.startTime,
//         endTime: event.endTime,
//     });

//     await user.save();
//     // console.log("USEREnroll", user)
//     const EventIdUser = user.enrolledEvents.eventId === eventId
//     console.log("USerWithSpecificEventId", EventIdUser)
//     console.log("EVENTID",eventId)
//     console.log("USEREVENTID",user.enrolledEvents.eventId)

//     res.json({ success: true, message: "Enrollment successful", user: user.enrolledEvents.eventId === eventId });
// });

// DELETE


// *REFERSHACCESSTOKEN_____________________________________

const enrollUserInEvent = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const { eventId } = req.body;

    // ✅ Check if user exists
    const user = await User.findById(userId);
    if (!user) return next(new ErrorHandler("User not found", 404));

    // ✅ Check if event exists
    const event = await Event.findById(eventId);
    if (!event) return next(new ErrorHandler("Event not found", 404));

    // console.log("Checking enrollment for event:", eventId);

    // ✅ Check if user is already enrolled in this specific event
    const isAlreadyEnrolled = user.enrolledEvents.some(
        (enrolledEvent) => enrolledEvent.eventId.toString() === eventId
    );

    if (isAlreadyEnrolled) {
        return next(new ErrorHandler("User already enrolled in this event", 400));
    }

    // ✅ Push new event to enrolledEvents
    const newEnrollment = {
        eventId: event._id,
        enrolled: true,
        title: event.title,
        category: event.category,
        startTime: event.startTime,
        endTime: event.endTime,
    };

    user.enrolledEvents.push(newEnrollment);
    await user.save();

    // ✅ Retrieve the enrolled event from updated user
    const enrolledEvent = user.enrolledEvents.find(
        (enrolled) => enrolled.eventId.toString() === eventId
    );

    // console.log("Successfully Enrolled in:", enrolledEvent);

    // ✅ Send only the specific enrolled event
    res.json({
        success: true,
        message: "Enrollment successful",
        enrolledEvent, // ✅ Only return the enrolled event
    });
});


const refreshAccessToken = asyncHandler(async (req, res, next) => {
    // console.log("Refreshing the accessToken...")
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    // console.log("INCOMING REFRESH TOKEN", incomingRefreshToken)
    if (!incomingRefreshToken) {
        // console.error("(refresh)")
        return next(new ErrorHandler("Unauthorises Request", 401))
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id);
        // console.log("USER FOUND", user)
        if (!user || user.refreshToken !== incomingRefreshToken) {
            // console.error("Invalid or Expired Refresh Token")
            return next(new ErrorHandler("Invalid or Expired Refresh Token", 401))

        }


        // const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id)
        const accessToken = await user.generateAccessToken()
        const newRefreshToken = await user.generateRefreshToken()
        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false });

        const options = {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "Strict"      // Helps prevent CSRF attacks
        }
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json({
                success: true,
                accessToken, refreshToken: newRefreshToken
            }
            )

    } catch (error) {
        return next(new ErrorHandler(error?.message || "Invalid Refresh Token", 401))
        // throw new ApiError(401, error?.message || "Invalid Refresh Token");
    }
})



// *GETQUIZQUESTIONS_________________________

const getquizQuestions = asyncHandler(async (req, res, next) => {
    try {
        const quizData = await Quiz.find();
        res.status(200).json({ quizData });


    } catch (error) {
        return next(new ErrorHandler("Error fetching questions", 500))

    }
})

// *GETEVENTS_____________________________-------
const getAllEvents = asyncHandler(async (req, res, next) => {
    const events = await Event.find();

    if (!events.length) {
        return next(new ErrorHandler("No events found", 404));
    }

    res.status(200).json({
        success: true,
        count: events.length,
        events
    });
});

/**
 * 📌 [USER] Get a single event by ID
 * ✅ Public Access
 */
const getEventById = asyncHandler(async (req, res, next) => {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
        return next(new ErrorHandler("Event not found", 404));
    }

    res.status(200).json({
        success: true,
        event
    });
});





const updateMarks = asyncHandler(async (req, res, next) => {
    try {
        const { marks, phone } = req.body;
        // console.log("MARKS AND PHONE BG..\n", marks, phone)

        if (!phone) {
            // console.error("Empty phone por marks")
            return next(new ErrorHandler("Cannot Find user to display..contact devloper", 400))
        }
        const user = await User.findOneAndUpdate(
            { phone: phone },
            { $set: { marks: marks } },
            { new: true, runValidators: true }
        )
        if (!user) {
            // console.error("No user for updating makrs..")
            return next(new ErrorHandler("User not found", 404));
        }

        return res.status(200).json({ success: true, message: "Marks updated successfully", user });
    } catch (error) {
        // console.error("error updating marks..\n", error)
        return next(new ErrorHandler("Error Updating Marks", 500))
    }
})


const getUsers = asyncHandler(async (req, res, next) => {
    try {
        const users = await User.find()
        return res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        // console.error("Error getting all users..\n", error)
        return next(new ErrorHandler("Error fetching all users", 500))
    }
})


export {
    register,
    login,
    logout,
    snedOTP,
    verifyOTP,
    getUSer,
    completeProfile,
    enrollUserInEvent,
    refreshAccessToken,

    getquizQuestions,

    getAllEvents,
    getEventById,


    updateMarks,
    getUsers
}

