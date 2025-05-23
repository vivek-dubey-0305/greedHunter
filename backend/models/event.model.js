import mongoose, { Schema } from "mongoose";

// // Define a schema for an event within a subcategory
// const EventSchema = new Schema({
//     title: { type: String, required: true, trim: true },
//     description: { type: String, required: true, trim: true },
//     createdAt: { type: Date, default: Date.now }, // Timestamp
//     eventType: { type: String, enum: ["virtual", "physical"], required: true },
//     // ✅ Start & End Time
//     startTime: { type: Date, required: true },
//     endTime: { type: Date, required: true },
//     price: { type: String, },
//     isFree: { type: Boolean, default: false },

//     // ✅ Location required only for physical events
//     location: {
//         type: String,
//         trim: true,
//         validate: {
//             validator: function (value) {
//                 // If event is "physical", location must be provided
//                 return this.eventType === "virtual" || (value && value.trim() !== "");
//             },
//             message: "Location is required for physical events."
//         }
//     },

//     // ✅ Array of rules & warnings
//     rules: { type: [String], default: [] },

//     // ✅ Reward Details (Cash, Prizes, Certificates)
//     rewardDetails: {
//         type: {
//             cashPrize: { type: Number, default: 0 }, // Cash reward amount
//             certificates: { type: Boolean, default: false }, // Whether certificates are provided
//             otherPrizes: { type: String, trim: true } // Description of other prizes
//         },
//         default: {}
//     },

//     // ✅ Social Media Links for Event Promotion
//     socialLinks: {
//         type: [String],
//         default: [],
//         validate: {
//             validator: function (links) {
//                 return links.every(link => /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(link));
//             },
//             message: "Each social link must be a valid URL."
//         }
//     }

// },
//     { timestamps: true }
// );

// // Define the main schema with dynamic subcategories
// const EventCategorySchema = new Schema({
//     category: { type: String, required: true, unique: true }, // Main category (Quiz, Games)
//     subcategories: {
//         type: Map,
//         of: [EventSchema], // Each subcategory holds an array of events
//         default: {},
//     },
// });


const EventCategorySchema = new Schema({
    category: { type: String, required: true, unique: true }, // Main category (Quiz, Games)
    subcategories: {
        type: Object, // ✅ Plain Object Instead of Map
        default: {}
    }
});

export const EventCategory = mongoose.model("EventCategory", EventCategorySchema);



// const eventSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },

//     eventType: {
//         type: String,
//         enum: ["virtual", "physical"],
//         required: true,
//     },

//     category: {
//         type: String,
//         required: true,
//         trim: true
//     },

//     // ✅ Automatically stores the date when the event is published
//     publishedDate: {
//         type: Date,
//         default: Date.now
//     },

//     // ✅ Start & End Time
//     startTime: {
//         type: Date,
//         required: true
//     },
//     endTime: {
//         type: Date,
//         required: true
//     },
//     price: {
//         type: String,
//     },
//     isFree: {
//         type: Boolean,
//         default: false
//     },

//     // ✅ Location required only for physical events
//     location: {
//         type: String,
//         trim: true,
//         validate: {
//             validator: function (value) {
//                 // If event is "physical", location must be provided
//                 return this.eventType === "virtual" || (value && value.trim() !== "");
//             },
//             message: "Location is required for physical events."
//         }
//     },

//     // ✅ Array of rules & warnings
//     rules: {
//         type: [String],
//         default: []
//     },

//     // ✅ Reward Details (Cash, Prizes, Certificates)
//     rewardDetails: {
//         type: {
//             cashPrize: { type: Number, default: 0 }, // Cash reward amount
//             certificates: { type: Boolean, default: false }, // Whether certificates are provided
//             otherPrizes: { type: String, trim: true } // Description of other prizes
//         },
//         default: {}
//     },

//     // ✅ Social Media Links for Event Promotion
//     socialLinks: {
//         type: [String],
//         default: [],
//         validate: {
//             validator: function (links) {
//                 return links.every(link => /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(link));
//             },
//             message: "Each social link must be a valid URL."
//         }
//     }

// }, { timestamps: true }); // ✅ Automatically adds `createdAt` & `updatedAt`

// export const Event = mongoose.model("Event", eventSchema);
