import { response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import ErrorHandler from "../middleware/error.middleware.js";
import { User } from "../models/user.model.js";

const register = asyncHandler(async (req, res, next) => {
    const { name, email, phone, rollNumber, enrollmentNumber, section, deviceId } = req.body;
    // console.log("REQ>BOY", req.body)

    try {
        if (!name || !email || !phone || !rollNumber || !enrollmentNumber || !section) {
            // console.error("fileds required")
            return next(new ErrorHandler("All Fields are required!", 400))
        }

        const existingUser = await User.findOne({
            $or: [
                { rollNumber },
                { enrollmentNumber },
                { phone },
                { email },

            ]
        })

        const existingDeviceIdUser = await User.findOne({ deviceId })

        if (existingUser) {
            // console.error("already exist")
            return next(new ErrorHandler(`User with ${rollNumber} or ${enrollmentNumber} already exist`, 401))
        }

        if (existingDeviceIdUser && existingDeviceIdUser.deviceId === deviceId) {
            console.error("The User has already register once with this device")
            // return next(new ErrorHandler("Account already exists on this device."), existingDeviceIdUser, 400)
            return res.status(400).json({
                success: false,
                existingDeviceIdUser,
                message: "Account already exists on this device."
            })
        }

        const user = await User.create({
            name,
            email,
            phone,
            rollNumber,
            enrollmentNumber,
            section,
            isRegisteredUSer: true,
            deviceId
        })

        if (!user) {
            // console.error("Unable to create User...try again or check the logic!")
            return next(new ErrorHandler("Unable to create user, please try again after sometime or contact the developer!"))
        }

        await user.save()

        return res.status(201).json({
            success: true,
            message: `Welcome ${user.name}!, All the besT`,
            user
        });
    } catch (error) {
        // console.error("Error creating or SavingUSer..\n", error)
        return next(new ErrorHandler("Error occured while creating USer...try after some time!", 401))
    }
})

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
    updateMarks,
    getUsers
}

