import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSchema = new Schema({
    adminName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    adminPassword: {
        type: String,
        required: true,
        trim: true,
    }
})

adminSchema.pre("save", async function (next) {
    if (!this.isModified("adminPassword")) return next();
    this.adminPassword = await bcrypt.hash(this.adminPassword, 10)
    next();
})

adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.adminPassword)
}


// jwt-aT, jwt-rT
// adminSchema.methods

export const Admin = mongoose.model("Admin", adminSchema)