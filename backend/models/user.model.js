import mongoose, { Schema } from "mongoose";


const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        rollNumber: {
            type: Number,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
        },

        enrollmentNumber: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        section: {
            type: String,
            required: true,
        },

        phone: {
            type: Number,
            unique: true,
            required: true,
        },

        email: {
            type: String,
            unique: true,
            required: true
        },

        marks: {
            type: Number,
        },

        isRegisteredUSer: {
            type: Boolean,
            default: false,
        },

        deviceId: {
            type: String,
            default: null
        }


    },
    {
        timestamps: true
    }
)


export const User = mongoose.model("User", userSchema);