// import mongoose, { Schema } from "mongoose";

// const quizSchema = new Schema(
//     {
//         question: {
//             type: String,
//             required: true,
//             trim: true,
//             unique: true,
//         },
//         options: {
//             type: [String], // Array of options
//             required: true,
//             validate: {
//                 validator: function (arr) {
//                     return arr.length >= 2 && arr.length <= 4; // At least 2, max 5 options
//                 },
//                 message: "A question must have between 2 and 5 options.",
//             },
//         },
//         correctOption: {
//             type: Number, // Index of correct option (0-based index)
//             required: true,
//             min: 0,
//             validate: {
//                 validator: function (value) {
//                     return this.options && value < this.options.length;
//                 },
//                 message: "Correct option index must be within options range.",
//             },
//         },


//     },
//     {
//         timestamps: true
//     }
// )

// export const Quiz = mongoose.model("Quiz", quizSchema);



import mongoose, { Schema } from "mongoose";

const dynamicSchema = new Schema(
    {
        category: {
            type: String,
            required: true,
            enum: ["Quiz", "Game", "Event"], // Main categories
        },
        subCategory: {
            type: String,
            required: true,
            trim: true, // AI, Maths, CyberSecurity for Quiz, Puzzle for Game, etc.
        },
        
        data: {
            type: Schema.Types.Mixed, // Stores different structures dynamically
            required: true,
        }
    },
    { timestamps: true, strict: false } // ✅ `strict: false` allows dynamic fields
);

export const DynamicData = mongoose.model("DynamicData", dynamicSchema);
