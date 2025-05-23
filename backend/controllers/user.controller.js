import { response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import ErrorHandler from "../middleware/error.middleware.js";
import { User } from "../models/user.model.js";
import { recieveEmail, sendEmail } from "../utils/mail.util.js";
import { DynamicData } from "../models/quiz.model.js";
import { EventCategory } from "../models/event.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { io } from "../app.js";



function generateEmailLinkTemplate(Token) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f7f7;">
<div>
<h3>
<a href="https://greedhunter.com/reset-password?token=${Token}">Click here to reset password</a>
</h3>
</div>
</body>
</html>`;
}

function generateEmailTemplate(verificationCode, companyName = "GreedHunter", logoUrl = "") {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #ffffff; color: #333;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tr>
              <td align="center" style="padding: 20px 0;">   
                  <table align="center" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #e5e5e5; border-radius: 8px; background-color: #ffffff; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);">
                      <tr>
                          <td style="padding: 25px; text-align: center; background-color: #f8f8f8; border-bottom: 1px solid #eeeeee;">
                              ${logoUrl ? `<img src="${logoUrl}" alt="${companyName}" width="120" style="margin-bottom: 10px;" />` : `<h2>${companyName}</h2>`}
                          </td>
                      </tr>
                      <tr>
                          <td style="padding: 30px; text-align: center;">
                              <h1 style="font-size: 22px; color: #333;">Verify Your Email</h1>
                              <p style="font-size: 16px; color: #666;">Use the code below to verify your email address:</p>
                              <div style="font-size: 28px; font-weight: bold; padding: 12px 24px; border: 2px solid #333; display: inline-block; margin: 15px 0;">
                                  ${verificationCode}
                              </div>
                              <p style="font-size: 14px; color: #777;">If you didn’t request this, ignore this email.</p>
                          </td>
                      </tr>
                      <tr>
                          <td style="padding: 20px; text-align: center; background-color: #f8f8f8; border-top: 1px solid #eeeeee;">
                              <p style="font-size: 12px; color: #999;">&copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.</p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>`;
}


// Example usage
// const verificationCode = "123456";
// const emailHtml = generateEmailTemplate(verificationCode, "Acme Inc.", "https://your-domain.com/logo.png");

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


        // const OTP = await user.generateVerificationCode()
        // await user.save()
        // console.log("OTP: ", OTP)

        // try {

        //     const message = generateEmailTemplate(OTP);
        //     const mailRes = await sendEmail({
        //         email,
        //         subject: "YOUR VERIFICATION CODE",
        //         message
        //     })
        //     console.log("MailResponse", mailRes)
        // } catch (error) {
        //     console.log("Email Error:\n", error || error.message)
        //     return next(new ErrorHandler(`Unable to send email to ${email}\n Error ${error.message || error}`, 400))
        //     // throw new ErrorHandler("Failed to send verification Code", 500)
        // }


        await user.save({ validateBeforeSave: false });

        // ...io
        io.emit("newUserRegistered", { username, fullName });

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
                message: `User created, OTP sent to ${email}`,
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
                    // $set: { isVerified: false },
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
                message: "User Logged Out Succeddfully!",
            })
    } catch (error) {
        // console.error("Logout Error:\n", error)
        return next(new ErrorHandler(`Error logout session :\n${error}`, 400))
    }
})

const snedOTP = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    console.log("USERID", userId)
    if (!userId) {
        // console.error(" Email not provided")
        return next(new ErrorHandler("The user is not registered, please try registering first", 400))
    }
    const user = await User.findById(userId)
    if (!user?.email) {
        // console.error("Wrong Email")
        return next(new ErrorHandler("Please provide email used for account creation!"))
    }

    const OTP = await user.generateVerificationCode()
    // console.log("OTP: ", OTP)
    await user.save()

    try {
        console.log(user.email)
        let email = user?.email

        const message = generateEmailTemplate(OTP);
        const mailRes = await sendEmail({
            email,
            subject: "YOUR VERIFICATION CODE",
            message
        })
        console.log("MailResponse", mailRes)
        return res.status(200).json({
            success: true,
            message: `Code sent successfully to ${email}`
        })

    } catch (error) {
        console.log("Email Error:\n", error.message || error)
        return next(new ErrorHandler(`Unable to send email to ${user.email}\n Error ${error.message || error}`, 400))
        // throw new ErrorHandler("Failed to send verification Code", 500)
    }
})


// !RESET PASSSWORD!!
const snedLink = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    console.log("HERE")
    if (!email) {
        // console.error(" Email not provided")
        return next(new ErrorHandler("Please provide the email to sned otp", 400))
    }
    const user = await User.findOne({ email })
    if (!user) {
        // console.error("Wrong Email")
        return next(new ErrorHandler("Please provide email used for account creation!"))
    }

    const Token = await user.generateResetPasswordLink()
    // console.log("OTP: ", OTP)
    await user.save()

    try {

        const message = generateEmailLinkTemplate(Token);
        const mailRes = await sendEmail({
            email,
            subject: "YOUR RESET PASSWORD LINK",
            message
        })
        console.log("MailRes", mailRes)
        return res.status(200).json({
            success: true,
            message: `Email sent successfully to ${email}`
        })

    } catch (error) {
        console.log("Email Error:\n", error)
        return next(new ErrorHandler(`Unable to send email to ${email}\n Error ${error.message || error}`, 400))
        // throw new ErrorHandler("Failed to send verification Code", 500)
    }
})

// !verify token and reset password
const resetPassword = asyncHandler(async (req, res, next) => {
    // const {token} = req.query;
    const { password, token } = req.body
    const user = await User.findOne({ token })

    console.log(password)
    console.log(token)
    // console.log("REQ otp", req.body)
    if (!user) {
        // console.error("Email X (verify)")
        return next(new ErrorHandler("Invalid link", 400))
    }


    if (!user.token || user.token !== token) {
        // console.error("Invalid OTP")
        return next(new ErrorHandler("INVALID Link token", 400))
    }

    if (user.tokenExpire < Date.now()) {
        // console.error("OTP Expired")
        return next(new ErrorHandler("Link Expired", 400))
    }

    user.password = password



    user.token = undefined;
    user.tokenExpire = undefined;

    await user.save({ validateBeforeSave: true });


    const resUser = await User.findById(user._id).select("-password -refreshToken");
    return res.status(200).
        json({
            success: true,
            message: `Password for ${user.username} reseted!`,
        })
})

const verifyOTP = asyncHandler(async (req, res, next) => {
    const { email, otp } = req.body;
    console.log("REQ otp", email, otp)
    console.log("REQ otp", { email, otp })
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

// const enrollUserInEvent = asyncHandler(async (req, res, next) => {
//     const userId = req.user._id;
//     const { eventId } = req.body;

//     // ✅ Check if user exists
//     const user = await User.findById(userId);
//     if (!user) return next(new ErrorHandler("User not found", 404));

//     // ✅ Check if event exists
//     const event = await Event.findById(eventId);
//     if (!event) return next(new ErrorHandler("Event not found", 404));

//     // console.log("Checking enrollment for event:", eventId);

//     // ✅ Check if user is already enrolled in this specific event
//     const isAlreadyEnrolled = user.enrolledEvents.some(
//         (enrolledEvent) => enrolledEvent.eventId.toString() === eventId
//     );

//     if (isAlreadyEnrolled) {
//         return next(new ErrorHandler("User already enrolled in this event", 400));
//     }

//     // ✅ Push new event to enrolledEvents
//     const newEnrollment = {
//         eventId: event._id,
//         enrolled: true,
//         title: event.title,
//         category: event.category,
//         startTime: event.startTime,
//         endTime: event.endTime,
//     };

//     user.enrolledEvents.push(newEnrollment);
//     await user.save();

//     // ✅ Retrieve the enrolled event from updated user
//     const enrolledEvent = user.enrolledEvents.find(
//         (enrolled) => enrolled.eventId.toString() === eventId
//     );

//     // console.log("Successfully Enrolled in:", enrolledEvent);

//     // ✅ Send only the specific enrolled event
//     res.json({
//         success: true,
//         message: "Enrollment successful",
//         enrolledEvent, // ✅ Only return the enrolled event
//     });
// });


// const enrollUserInEvent = asyncHandler(async (req, res, next) => {
//     const userId = req.user._id;
//     const { category, subcategory, eventId } = req.body;

//     try {
//         // ✅ Fetch user
//         const user = await User.findById(userId);
//         if (!user) return next(new ErrorHandler("User not found", 404));

//         // ✅ Fetch event category
//         const eventCategory = await EventCategory.findOne({ category });
//         if (!eventCategory) return next(new ErrorHandler("Category not found", 404));

//         // ✅ Ensure subcategory exists
//         const events = eventCategory.subcategories?.[subcategory];
//         if (!Array.isArray(events) || events.length === 0) {
//             return next(new ErrorHandler("Subcategory not found or has no events", 404));
//         }

//         // ✅ Find the event by ID
//         const event = events.find(evt => String(evt._id) === eventId);
//         if (!event) return next(new ErrorHandler("Event not found", 404));

//         // ✅ Initialize user enrolledEvents structure if missing
//         if (!user.enrolledEvents[category]) {
//             user.enrolledEvents[category] = {};
//         }
//         if (!user.enrolledEvents[category][subcategory]) {
//             user.enrolledEvents[category][subcategory] = [];
//         }

//         // ✅ Check if the user is already enrolled
//         const isAlreadyEnrolled = user.enrolledEvents[category][subcategory].some(
//             enrolledEvent => String(enrolledEvent.eventId) === eventId
//         );

//         if (isAlreadyEnrolled) {
//             return next(new ErrorHandler("User already enrolled in this event", 400));
//         }

//         // ✅ Create enrollment data
//         const newEnrollment = {
//             eventId: event._id,
//             enrolled: true,
//             title: event.title,
//             startTime: event.startTime,
//             endTime: event.endTime,
//             isPlayed :false,
//             marks: 0,
//             rank: 0,
//             won:false
//         };

//         // ✅ Push the new enrollment & Update user correctly
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             {
//                 $push: { [`enrolledEvents.${category}.${subcategory}`]: newEnrollment }
//             },
//             { new: true, runValidators: true }
//         );

//         res.json({
//             success: true,
//             message: "Enrollment successful",
//             enrolledEvent: newEnrollment,
//             user: updatedUser, // ✅ Return updated user
//         });

//     } catch (error) {
//         return next(new ErrorHandler(`Error enrolling user: ${error.message}`, 400));
//     }
// });

const enrollUserInEvent = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const { category, subcategory, eventId, startTime, Location } = req.body;
    console.log(category, subcategory, eventId, startTime, startTime.toLocaleString())

    try {
        // ✅ Fetch user
        const user = await User.findById(userId);
        if (!user) return next(new ErrorHandler("User not found", 404));

        // ✅ Fetch event category
        const eventCategory = await EventCategory.findOne({ category });
        if (!eventCategory) return next(new ErrorHandler("Category not found", 404));

        // ✅ Ensure subcategory exists
        const events = eventCategory.subcategories?.[subcategory];
        if (!Array.isArray(events) || events.length === 0) {
            return next(new ErrorHandler("Subcategory not found or has no events", 404));
        }

        // ✅ Find the event by ID
        const event = events.find(evt => String(evt._id) === eventId);
        if (!event) return next(new ErrorHandler("Event not found", 404));

        // ✅ Check if already enrolled
        const isAlreadyEnrolled = user.enrolledEvents.some(
            (enrollment) => String(enrollment.eventId) === eventId
        );

        if (isAlreadyEnrolled) {
            return next(new ErrorHandler("User already enrolled in this event", 400));
        }



        // ✅ Create enrollment data (No title, startTime stored)
        const newEnrollment = {
            eventId: event._id,
            eventCategory: eventCategory._id,
            category: category,
            subcategory: subcategory,
            startTime: startTime,
            Location: Location,
            isPlayed: false,
            marks: 0,
            rank: 0,
            won: false
        };

        // ✅ Push enrollment & update user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { enrolledEvents: newEnrollment } },
            { new: true, runValidators: true }
        ).populate("enrolledEvents.eventId");

        res.json({
            success: true,
            message: "Enrollment successful",
            enrolledEvent: newEnrollment,
            user: updatedUser, // ✅ Return updated user with populated events
        });

    } catch (error) {
        return next(new ErrorHandler(`Error enrolling user: ${error.message}`, 400));
    }
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


const updateProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user._id
    const { username, fullName, email, phone, gender, social_links = {} } = req.body
    // console.log("req.body[registerUser]:\n", req.body)

    const requiredFields = [username, fullName, email, phone]
    // console.log("requiredFields", requiredFields)

    const checkFields = { username, email, phone }
    // console.log("Check Fields", checkFields)

    // *Required Fields_____________________________________________
    if (!username || !fullName || !email || !phone) {
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

    // *Check for an existing User__________________________________________________
    const existingUser = await User.findOne({
        _id: { $ne: userId }, // Exclude the current user
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
        Object.keys(social_links).forEach(platform => {
            if (social_links[platform]) {
                let hostname = new URL(social_links[platform]).hostname;
                if (!hostname.includes(`${platform}.com`) && platform !== "website") {
                    throw new Error(`${platform} link is invalid. You must enter a full link`);
                }
            }
        });
    } catch (error) {
        return res.status(403).json({
            error: "You must provide full links with http(s) included"
        });
    }




    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, fullName, email, phone, gender, social_links },
        { new: true, runValidators: true }
    ).select("-password -refreshToken");

    if (!updatedUser) {
        return next(new ErrorHandler("User not found", 404));
    }

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser
    });


})


const deleteUser = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return next(new ErrorHandler("User Not Found", 404))

        }

        // Delete the user
        await User.findByIdAndDelete(userId);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return next(new ErrorHandler("Internal Server Error", 500))


    }
});


const changeCurrentPassword = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    const { currentPassword, newPassword, confirmPassword } = req.body;



    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);

    console.log("USER BEFORE SAVE", user);

    if (!isPasswordCorrect) {
        // throw new ApiError(401, "");
        return next(new ErrorHandler("Invalid old password", 401))
    }

    if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("Confirm Password dindn't match the new Password!", 401))
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    console.log("USER AFTER SAVE", user);

    return res.status(200).json({
        success: true,
        message: "Password update Successfully!"
    })
})


// *GETQUIZQUESTIONS_________________________

// const getquizQuestions = asyncHandler(async (req, res, next) => {
//     try {
//         const quizData = await Quiz.find();
//         res.status(200).json({ quizData });


//     } catch (error) {
//         return next(new ErrorHandler("Error fetching questions", 500))

//     }
// })
//!-----------------
// const getQuizBySubCategory = asyncHandler(async (req, res, next) => {
//     try {
//         const { category, subcategory } = req.params;
//         console.log("SUBCATEGOR", category, subcategory)

//         const quizData = await DynamicData.findOne({
//             category: category,
//             subCategory: subcategory
//         });

//         if (!quizData) {
//             return res.status(404).json({ message: "No quiz found for this subcategory" });
//         }
// // console.log(quizData)
//         return res.status(200).json({questions :quizData.data.questions, time:quizData.time});

//     } catch (error) {
//         console.error("Error fetching quiz:", error);
//         return next(new ErrorHandler(`INTERnal server error as:\n${error.message}`, 403))
//     }
// });


const quizStartTimes = {}; // Store quiz start times in memory

const getQuizBySubCategory = asyncHandler(async (req, res, next) => {
    try {
        const { category, subcategory } = req.params;
        console.log("Fetching Quiz for:", category, subcategory);

        const quizData = await DynamicData.findOne({
            category: category,
            subCategory: subcategory
        });

        if (!quizData) {
            return next(new ErrorHandler("No quiz found for this subcategory", 404))
            // return res.status(404).json({ message: " });
        }

        const quizKey = `${category}_${subcategory}`;
        const quizDuration = quizData.time * 60 * 1000; // Convert minutes to milliseconds

        // If quiz start time does not exist, set it
        if (!quizStartTimes[quizKey]) {
            quizStartTimes[quizKey] = Date.now();
        }

        // Calculate the elapsed time and remaining time
        const elapsedTime = Date.now() - quizStartTimes[quizKey];
        const remainingTime = Math.max(quizDuration - elapsedTime, 0);

        return res.status(200).json({
            questions: quizData.data.questions,
            timeLeft: Math.floor(remainingTime / 1000), // Convert milliseconds to seconds
            totalTime: quizData.time * 60
        });

    } catch (error) {
        console.error("Error fetching quiz:", error);
        return next(new ErrorHandler(`Internal server error:\n${error.message}`, 500));
    }
});


// *GETEVENTS_____________________________-------
// const getAllEvents = asyncHandler(async (req, res, next) => {
//     const events = await Event.find();

//     if (!events.length) {
//         return next(new ErrorHandler("No events found", 404));
//     }

//     res.status(200).json({
//         success: true,
//         count: events.length,
//         events
//     });
// });

const getAllEvents = asyncHandler(async (req, res, next) => {
    const { category, subcategory } = req.query;

    try {
        let query = {};
        if (category) query.category = category;

        const events = await EventCategory.find(query);

        if (!events.length) {
            return next(new ErrorHandler("No events found", 404));
        }

        let eventData = events.map(evt => ({
            category: evt.category,
            subcategories: evt.subcategories
        }));

        if (subcategory) {
            eventData = events.map(evt => ({
                category: evt.category,
                subcategories: { [subcategory]: evt.subcategories[subcategory] || [] }
            }));
        }

        res.status(200).json({
            success: true,
            count: eventData.length,
            events: eventData,
        });
    } catch (error) {
        return next(new ErrorHandler(`Error fetching events \n${error.message}`, 500));
    }
});



/**
 * 📌 [USER] Get a single event by ID
 * ✅ Public Access
 */
// const getEventById = asyncHandler(async (req, res, next) => {
//     const { eventId } = req.params;

//     const event = await Event.findById(eventId);
//     if (!event) {
//         return next(new ErrorHandler("Event not found", 404));
//     }

//     res.status(200).json({
//         success: true,
//         event
//     });
// });

const getEventById = asyncHandler(async (req, res, next) => {
    const { category, subcategory, eventId } = req.params;
    console.log("Fetching Event:", category, subcategory, eventId);

    try {
        // ✅ Find category
        const eventCategory = await EventCategory.findOne({ category });
        if (!eventCategory) return next(new ErrorHandler("Category not found", 404));

        // ✅ Ensure subcategory exists
        const events = eventCategory.subcategories?.[subcategory];
        if (!Array.isArray(events) || events.length === 0) {
            return next(new ErrorHandler("Subcategory not found or has no events", 404));
        }

        // ✅ Find event by ID
        const event = events.find(evt => String(evt._id) === eventId);
        console.log(event._id)
        if (!event) return next(new ErrorHandler("Event not found", 404));

        res.status(200).json({ success: true, event });
    } catch (error) {
        return next(new ErrorHandler(`Error fetching event: ${error.message}`, 500));
    }
});





const updateMarks = asyncHandler(async (req, res, next) => {
    try {
        const { marks, category, subcategory, eventId, isPlayed, winTime } = req.body;
        const userId = req.user._id;

        console.log("MARKS UPDATE PAYLOAD:\n", { marks, userId, category, subcategory, eventId, isPlayed, winTime });

        if (!userId) {
            return next(new ErrorHandler("Cannot find user. Please contact the developer.", 400));
        }

        // ✅ Find & update enrolledEvents where eventId, category, and subcategory match
        // const user = await User.findOneAndUpdate(
        //     {
        //         _id: userId,
        //         "enrolledEvents.eventId": eventId,  // Match the correct eventId
        //         "enrolledEvents.category": category,
        //         "enrolledEvents.subcategory": subcategory
        //     },
        //     {
        //         $set: {
        //             "enrolledEvents.$.marks": marks, // ✅ Update marks directly
        //             "enrolledEvents.$.winTime": winTime,
        //             "enrolledEvents.$.isPlayed": isPlayed // ✅ Also update `isPlayed` if needed
        //         }
        //     },
        //     { new: true, runValidators: true }
        // );

        const user = await User.findOneAndUpdate(
            {
                _id: userId
            },
            {
                $set: {
                    "enrolledEvents.$[elem].marks": marks,
                    "enrolledEvents.$[elem].winTime": winTime,
                    "enrolledEvents.$[elem].isPlayed": isPlayed
                }
            },
            {
                new: true,
                runValidators: true,
                arrayFilters: [
                    {
                        "elem.eventId": eventId,  // ✅ Exact match for eventId inside the array
                        "elem.category": category,
                        "elem.subcategory": subcategory
                    }
                ]
            }
        );



        console.log("UPDATED USER:\n", user);



        if (!user) {
            return next(new ErrorHandler("User or event not found", 404));
        }



        // In your updateMarks controller after saving user
        const updatedUser = await User.findById(userId)
            .lean()
        // .populate('enrolledEvents'); // If you need population

        // Find the highest event
        const highestEvent = updatedUser.enrolledEvents.reduce((max, event) => {
            if (!max ||
                event.marks > max.marks ||
                (event.marks === max.marks && event.winTime < max.winTime)
            ) {
                return event;
            }
            return max;
        }, null);

        // Emit the full update with winTime
        io.emit("leaderboardUpdate", {
            updatedUser: {
                fullName: updatedUser.fullName,
                enrollmentNumber: updatedUser.enrollmentNumber,
                highestEvent: {
                    marks: highestEvent.marks,
                    category: highestEvent.category,
                    subcategory: highestEvent.subcategory,
                    winTime: highestEvent.winTime
                }
            }
        });

        return res.status(200).json({
            success: true,
            message: "Marks updated successfully",
            user
        });

    } catch (error) {
        console.error("Error updating marks:\n", error);
        return next(new ErrorHandler("Error updating marks", 500));
    }
});



// const updateMarks = asyncHandler(async (req, res, next) => {
//     try {
//         // const {  } = req.query
//         // console.log("categiry", category, subcategory)
//         const { marks, category, subcategory, eventId, isPlayed } = req.body;
//         const userId =req.user._id
//         console.log("MARKS AND PHONE BG..\n", marks, userId, category, subcategory,eventId, isPlayed)

//         if (!userId) {
//             // console.error("Empty phone por marks")
//             return next(new ErrorHandler("Cannot Find user to display..contact devloper", 400))
//         }
//         const user = await User.findOneAndUpdate(
//             userId,
//             { $set: { [`enrolledEvents.[${category}]?.[${subcategory}].$.marks`]: marks } },
//             { new: true, runValidators: true }
//         )
//         console.log("USER", user)
//         if (!user) {
//             // console.error("No user for updating makrs..")
//             return next(new ErrorHandler("User not found", 404));
//         }

//         return res.status(200).json({ success: true, message: "Marks updated successfully", user });
//     } catch (error) {
//         // console.error("error updating marks..\n", error)
//         return next(new ErrorHandler("Error Updating Marks", 500))
//     }
// })


// const updateMarks = asyncHandler(async (req, res, next) => {
//     try {
//         const { marks, category, subcategory, eventId, isPlayed } = req.body;
//         const userId = req.user._id
//         console.log("UPDATING MARKS:\n", { marks, userId, category, subcategory, eventId, isPlayed });

//         if (!category || !subcategory || !eventId) {
//             return next(new ErrorHandler("Missing required fields", 400));
//         }

//         // ✅ Find the user
//         const user = await User.findOne(userId);
//         if (!user) return next(new ErrorHandler("User not found", 404));

//         // ✅ Ensure user is enrolled in the category & subcategory
//         if (!user.enrolledEvents?.[category]?.[subcategory]) {
//             return next(new ErrorHandler("User is not enrolled in this event", 400));
//         }

//         // ✅ Locate the event inside enrolledEvents array
//         const eventIndex = user.enrolledEvents[category][subcategory].findIndex(
//             (event) => String(event.eventId) === String(eventId)
//         );
//         console.log("eventIndex", eventIndex)

//         if (eventIndex === -1) {
//             return next(new ErrorHandler("Event not found in enrolled events", 404));
//         }

//         // ✅ Update the marks for the specific event
//         // console.log("first", user.enrolledEvents)
//         // console.log("second", user.enrolledEvents[category])
//         // console.log("second", user.enrolledEvents?.[category])
//         // console.log("thisrd", user.enrolledEvents[category][subcategory])
//         // console.log("1", user.enrolledEvents[category]?.[subcategory])
//         // console.log("2", user.enrolledEvents[category]?.[subcategory][eventIndex])
//         // console.log("3", user.enrolledEvents[category]?.[subcategory]?.[eventIndex])
//         // console.log("fourh", user.enrolledEvents[category][subcategory][eventIndex].marks)
//         console.log(marks)
//         // user.enrolledEvents[category][subcategory][eventIndex].marks = marks;


//         console.log("Before Update:", user.enrolledEvents[category][subcategory][eventIndex]);
//         user.enrolledEvents[category][subcategory][eventIndex].marks = marks;
//         user.enrolledEvents[category][subcategory][eventIndex].isPlayed = isPlayed;
//         console.log("After Update:", user.enrolledEvents[category][subcategory][eventIndex]);

//         // ✅ Mark the field as modified
//         user.markModified(`enrolledEvents.${category}.${subcategory}`);



//         // ✅ Save the updated user document
//         await user.save();

//         // ✅ Emit update to all clients (REAL-TIME BROADCAST)
//         io.emit("leaderboardUpdate", {
//             category,
//             subcategory,
//             eventId,
//             updatedUser: {
//                 fullName: user.fullName,
//                 enrollmentNumber: user.enrollmentNumber,
//                 marks: marks
//             }
//         });

//         res.status(200).json({
//             success: true,
//             message: "Marks updated successfully",
//             updatedEvent: user.enrolledEvents[category][subcategory][eventIndex],
//         });

//     } catch (error) {
//         console.error("Error updating marks:", error);
//         return next(new ErrorHandler("Error updating marks", 500));
//     }
// });





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





const sendMailTotopTen = asyncHandler(async (req, res, next) => {
    try {
        const users = await User.find({}, "fullName email enrolledEvents");

        // ✅ Get Top 10 Users based on highest marks and lowest winTime
        const leaderboard = users
            .map((usr) => ({
                fullName: usr.fullName,
                email: usr.email,
                highestEvent:
                    usr.enrolledEvents?.reduce(
                        (max, event) =>
                            event.marks > (max?.marks || 0) ||
                                (event.marks === max?.marks && event.winTime < max?.winTime)
                                ? event
                                : max,
                        {}
                    ) || {},
            }))
            .filter((usr) => usr.highestEvent.marks !== undefined)
            .sort((a, b) => {
                if ((b.highestEvent.marks || 0) !== (a.highestEvent.marks || 0)) {
                    return (b.highestEvent.marks || 0) - (a.highestEvent.marks || 0);
                } else {
                    return (a.highestEvent.winTime || Infinity) - (b.highestEvent.winTime || Infinity);
                }
            })
            .slice(0, 10);

        if (leaderboard.length === 0) {
            return res.status(404).json({ success: false, message: "No top users found" });
        }

        // ✅ Send custom emails to Top 3 Users
        for (let i = 0; i < leaderboard.length; i++) {
            const user = leaderboard[i];

            let subject, message;

            if (i === 0) {
                // 🥇 First Place Winner
                subject = "🏆 You Are The Champion! #1 on Leaderboard!";
                message = `
                    <h2>🎉 Congratulations, ${user.fullName}! 🎉</h2>
                    <p>You've claimed the <strong>1st place</strong> on the leaderboard! 🥇</p>
                    <ul>
                        <li><strong>Category:</strong> ${user.highestEvent.category || "N/A"}</li>
                        <li><strong>Subcategory:</strong> ${user.highestEvent.subcategory || "N/A"}</li>
                        <li><strong>Marks:</strong> ${user.highestEvent.marks}</li>
                        <li><strong>Completion Time:</strong> ${user.highestEvent.winTime} seconds</li>
                    </ul>
                    <p>You are the ultimate GreedHunter Champion! Keep dominating! 🚀🔥</p>
                    <br>
                    <p>Best regards,<br><strong>GreedHunter Team</strong></p>
                `;
            } else if (i === 1) {
                // 🥈 Second Place Winner
                subject = "🥈 Amazing! You Secured 2nd Place!";
                message = `
                    <h2>🎉 Great Job, ${user.fullName}! 🎉</h2>
                    <p>You secured the <strong>2nd place</strong> on the leaderboard! 🥈</p>
                    <ul>
                        <li><strong>Category:</strong> ${user.highestEvent.category || "N/A"}</li>
                        <li><strong>Subcategory:</strong> ${user.highestEvent.subcategory || "N/A"}</li>
                        <li><strong>Marks:</strong> ${user.highestEvent.marks}</li>
                        <li><strong>Completion Time:</strong> ${user.highestEvent.winTime} seconds</li>
                    </ul>
                    <p>You're just one step away from the top! Keep pushing! 💪🔥</p>
                    <br>
                    <p>Best regards,<br><strong>GreedHunter Team</strong></p>
                `;
            } else if (i === 2) {
                // 🥉 Third Place Winner
                subject = "🥉 You Made It! 3rd Place on Leaderboard!";
                message = `
                    <h2>🎉 Well Done, ${user.fullName}! 🎉</h2>
                    <p>You earned the <strong>3rd place</strong> on the leaderboard! 🥉</p>
                    <ul>
                        <li><strong>Category:</strong> ${user.highestEvent.category || "N/A"}</li>
                        <li><strong>Subcategory:</strong> ${user.highestEvent.subcategory || "N/A"}</li>
                        <li><strong>Marks:</strong> ${user.highestEvent.marks}</li>
                        <li><strong>Completion Time:</strong> ${user.highestEvent.winTime} seconds</li>
                    </ul>
                    <p>You're among the best! Keep up the amazing work! 🔥</p>
                    <br>
                    <p>Best regards,<br><strong>GreedHunter Team</strong></p>
                `;
            } else {
                // 📩 Generic email for ranks 4-10
                subject = "🎯 You're in the Top 10! Keep Going!";
                message = `
                    <h2>🎉 Congratulations, ${user.fullName}! 🎉</h2>
                    <p>You have secured a top position in the leaderboard with:</p>
                    <ul>
                        <li><strong>Category:</strong> ${user.highestEvent.category || "N/A"}</li>
                        <li><strong>Subcategory:</strong> ${user.highestEvent.subcategory || "N/A"}</li>
                        <li><strong>Marks:</strong> ${user.highestEvent.marks}</li>
                        <li><strong>Completion Time:</strong> ${user.highestEvent.winTime} seconds</li>
                    </ul>
                    <p>You're on the right track! Keep competing and improving! 💪🔥</p>
                    <br>
                    <p>Best regards,<br><strong>GreedHunter Team</strong></p>
                `;
            }

            const mailResponse = await sendEmail({
                email: user.email,
                subject,
                message,
            });
            console.log("MAilResponse to TOP10", mailResponse)
        }

        return res.status(200).json({
            success: true,
            message: "Emails sent successfully to the top 10 users",
            topUsers: leaderboard,
        });

    } catch (error) {
        console.error("❌ Error fetching & emailing top users:", error);
        return res.status(500).json({ success: false, message: error || "Error processing request" });
    }
});




const userContactMail = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;
        console.log({ name, email, subject, message })

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        await recieveEmail({ name, email, subject, message });

        return res.status(200).json({ success: true, message: "Your message has been sent successfully!" });
    } catch (error) {
        console.error("Email Error:", error);
        return next(new ErrorHandler(`Failed to send email.\n\n${error}`, 500))
        //   return res.status(500).json({ success: false, message:  });
    }
});



const getHomepageStats = asyncHandler(async (req, res, next) => {
    try {
        const stats = await User.aggregate([
            {
                $group: {
                    _id: null,
                    totalUsers: { $sum: 1 }, // Count total users
                    totalWinners: { $sum: { $cond: ["$enrolledEvents.won", 1, 0] } }, // Count users who have won at least once
                    totalPrizeDistributed: { $sum: "$enrolledEvents.marks" } // Sum of all marks as the total prize
                }
            }
        ]);

        const response = stats.length > 0 ? stats[0] : { totalUsers: 0, totalWinners: 0, totalPrizeDistributed: 0 };

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching homepage stats:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



export {
    register,
    login,
    logout,
    snedOTP,
    snedLink,
    resetPassword,
    verifyOTP,
    getUSer,
    completeProfile,
    updateProfile,
    changeCurrentPassword,
    enrollUserInEvent,
    refreshAccessToken,
    deleteUser,
    // getquizQuestions,
    getQuizBySubCategory,

    getAllEvents,
    getEventById,



    updateMarks,
    getUsers,

    sendMailTotopTen,
    userContactMail,

    getHomepageStats
}

