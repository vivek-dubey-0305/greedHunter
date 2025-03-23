import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import randomstring from "randomstring"

const userSchema = new Schema(
    {
        username: {
            type: String, required: true, lowercase: true, trim: true, unique: true,
        },
        fullName: {
            type: String, required: true, trim: true,
        },
        phone: {
            type: Number, unique: true, required: true, trim: true,
        },
        email: {
            type: String, unique: true, required: true, lowercase: true, trim: true,
        },
        password: {
            type: String, required: [true, "PASSWORD IS REQUIRED!"]
        },
        refreshToken: {
            type: String
        },
        gender: {
            type: String, required: true, lowecarse: true, trim: true, default: "not specified"
        },
        // -------------------
        studyLevel: {
            type: String, required: true, trim: true, default: "not specified"
        },

        // enrolledEvents: { type: Object, }, // ✅ Plain Object Instead of Map default: {}

        enrolledEvents: [
            {
                eventCategory: { type: Schema.Types.ObjectId, ref: "EventCategory" },  // ✅ References EventCategory
                category: { type: String, required: true },  // ✅ Stores subcategory name
                subcategory: { type: String, required: true },  // ✅ Stores subcategory name
                startTime: { type: Date, required: true },
                Location:{type:String},
                eventId: { type: Schema.Types.ObjectId, required: true, },  // ✅ Stores event reference
                isPlayed: { type: Boolean, default: false },  // ✅ User-specific data
                marks: { type: Number, default: 0 },  // ✅ User-specific data
                rank: { type: Number, default: 0 },  // ✅ User-specific data
                won: { type: Boolean, default: false },  // ✅ User-specific data/
                winTime: { type: Number,},  

            }
        ],


        // School-related fields
        schoolName: {
            type: String, trim: true,
            required: function () {
                return this.studyLevel === "School";
            },
        },

        standard: {
            type: String, trim: true,
            required: function () {
                return this.studyLevel === "School";
            },
        },

        rollNumber: {
            type: String, lowercase: true, trim: true,
            required: function () {
                return this.studyLevel === "School";
            },
        },
        // College-related fields
        collegeName: {
            type: String, trim: true,
            required: function () {
                return this.studyLevel === "College";
            },
        },
        course: {
            type: String, trim: true,
            required: function () {
                return this.studyLevel === "College";
            },
        },
        semester: {
            type: String, trim: true,
            required: function () {
                return this.studyLevel === "College";
            },
        },

        enrollmentNumber: {
            type: String, trim: true, unique: true, sparse: true, //✅ Allows multiple `null` values
            required: function () {
                return this.studyLevel === "College";
            },
        },

        isVerified: {
            type: Boolean, default: false,
        },
        isProfileCompleted: {
            type: Boolean, default: false,
        },

        social_links: {
            youtube: {
                type: String,
                default: "",
            },
            instagram: {
                type: String,
                default: "",
            },
            facebook: {
                type: String,
                default: "",
            },
            twitter: {
                type: String,
                default: "",
            },
            github: {
                type: String,
                default: "",
            },
            website: {
                type: String,
                default: "",
            }
        },

        verificationCode: Number,
        verificationCodeExpire: Date,
        token: String,
        tokenExpire: Date,
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
        const remainingDigits = Math.floor(Math.random() * 10000).toString().padStart(5, 0)

        return parseInt(firstDigit + remainingDigits)
    }

    const verificationCode = generateCodeNumber()
    this.verificationCode = verificationCode
    this.verificationCodeExpire = Date.now() + 3 * 60 * 1000
    // console.log("Generated Verification Code:", verificationCode);
    return verificationCode
}

userSchema.methods.generateResetPasswordLink = function () {
    function generateLink() {
        const randomString = randomstring.generate()

        return randomString
    }

    const token = generateLink()
    this.token = token
    this.tokenExpire = Date.now() + 7 * 60 * 1000
    // console.log("Generated Verification Code:", verificationCode);
    return token
}


export const User = mongoose.model("User", userSchema);


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




// ✅ Enrollment Fields
// enrolled: { type: Boolean, default: false },  // If user is enrolled
// category: { type: String, trim: true },  // Category of enrollment
// enrolledEvents: [
//     {
//         eventId: { type: Schema.Types.ObjectId, ref: "Event" },
//         enrolled: { type: Boolean, default: false },
//         title: { type: String, required: true },
//         category: { type: String, required: true },
//         marks: { type: Number },
//         startTime: { type: Date, required: true },
//         endTime: { type: Date, required: true },
//     },
// ],

// enrolledEvents: {
//     type: Map,
//     of: {
//         type: Map,
//         of: [{
//             eventId: { type: Schema.Types.ObjectId, ref: "EventCategory" },
//             enrolled: { type: Boolean, default: false },
//             title: { type: String, required: true },
//             marks: { type: Number },

//             startTime: { type: Date, required: true },
//             endTime: { type: Date, required: true },
//         }]
//     },
//     default: () => ({})
//         // default: () => new Map()
// },
