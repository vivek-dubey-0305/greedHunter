// import mongoose, { Schema } from "mongoose";


// const userSchema = new Schema(
//     {
//         username: {
//             type: String,
//             required: true,
//             lowercase: true,
//             trim: true,
//             unique: true
//         },
//         name: {
//             type: String,
//             required: true,
//             lowercase: true,
//             trim: true,
//         },
//         gender: {
//             type: String,
//             required: true,
//             trim: true,
//         },

//         phone: {
//             type: Number,
//             unique: true,
//             required: true,
//         },

//         email: {
//             type: String,
//             unique: true,
//             required: true
//         },

//         studyLevel: {
//             type: String,
//             required: true,
//             trim: true,
//         },

//         schoolName: {
//             type: String,
//             required: true,
//             trim: true,
//             default:null
//         },

//         standard: {
//             type: String,
//             required: true,
//             trim: true,
//             default:null
//         },

//         rollNumber: {
//             type: String,
//             required: true,
//             lowercase: true,
//             trim: true,
//             default:null
//         },


//         collegeName: {
//             type: String,
//             required: true,
//             trim: true,
//             default:null
//         },

//         course: {
//             type: String,
//             required: true,
//             trim: true,
//             default:null
//         },

//         semester: {
//             type: String,
//             required: true,
//             trim: true,
//             default:null
//         },

//         enrollmentNumber: {
//             type: String,
//             required: true,
//             trim: true,
//             unique: true,
//             default:null
//         },

//         section: {
//             type: String,
//             required: true,
//         },

//         marks: {
//             type: Number,
//         },

//         isRegisteredUSer: {
//             type: Boolean,
//             default: false,
//         },

//         deviceId: {
//             type: String,
//             default: null
//         }
//     },
//     {
//         timestamps: true
//     }
// )


// export const User = mongoose.model("User", userSchema);

import mongoose, { Schema } from "mongoose";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: Number,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "PASSWORD IS REQUIRED!"]
        },
        refreshToken: {
            type: String
        },
        gender: {
            type: String,
            required: true,
            lowecarse: true,
            trim: true,
            default: "not specified"
        },

        // -------------------
        studyLevel: {
            type: String,
            required: true,
            trim: true,
            default: "not specified"
        },


        // ✅ Enrollment Fields
        // enrolled: { type: Boolean, default: false },  // If user is enrolled
        // category: { type: String, trim: true },  // Category of enrollment
        enrolledEvents: [
            {
                eventId: { type: Schema.Types.ObjectId, ref: "Event" },
                enrolled: { type: Boolean, default: false },
                title: { type: String, required: true },
                category: { type: String, required: true },
                startTime: { type: Date, required: true },
                endTime: { type: Date, required: true },
            },
        ],

        // School-related fields
        schoolName: {
            type: String,
            required: function () {
                return this.studyLevel === "School";
            },
            trim: true,
        },
        standard: {
            type: String,
            required: function () {
                return this.studyLevel === "School";
            },
            trim: true,
        },
        rollNumber: {
            type: String,
            required: function () {
                return this.studyLevel === "School";
            },
            lowercase: true,
            trim: true,
        },
        // College-related fields
        collegeName: {
            type: String,
            required: function () {
                return this.studyLevel === "College";
            },
            trim: true,
        },
        course: {
            type: String,
            required: function () {
                return this.studyLevel === "College";
            },
            trim: true,
        },
        semester: {
            type: String,
            required: function () {
                return this.studyLevel === "College";
            },
            trim: true,
        },
        enrollmentNumber: {
            type: String,
            required: function () {
                return this.studyLevel === "College";
            },
            trim: true,
            unique: true,
            sparse: true, //✅ Allows multiple `null` values
        },
        marks: {
            type: Number,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isProfileCompleted: {
            type: Boolean,
            default: false,
        },

        verificationCode: Number,
        verificationCodeExpire: Date,
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    // console.log("Generating Access Token for User:", this);
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            phone: this.phone,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            // process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateVerificationCode = function () {
    function generateCodeNumber() {
        const firstDigit = Math.floor(Math.random() * 9) + 1
        const remainingDigits = Math.floor(Math.random() * 10000).toString().padStart(4, 0)

        return parseInt(firstDigit + remainingDigits)
    }

    const verificationCode = generateCodeNumber()
    this.verificationCode = verificationCode
    this.verificationCodeExpire = Date.now() + 3 * 60 * 1000
    // console.log("Generated Verification Code:", verificationCode);
    return verificationCode
}
// userSchema.methods.generateRefreshToken = function (res) {
//     const refreshToken = jwt.sign(
//         { _id: this._id },
//         process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
//     );

//     res.cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production", // Secure in production
//         sameSite: "Strict",
//         maxAge: process.env.REFRESH_TOKEN_EXPIRY
//     });

//     return refreshToken;
// };


export const User = mongoose.model("User", userSchema);