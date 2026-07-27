const mongoose = require("mongoose");

const interviewReportSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    
    // 🟢 FIX: title me default fallback lagayein taaki Mongoose kabhi block na kare
    title: { 
        type: String, 
        default: "MERN Stack Interview Strategy" 
    },
    
    jobDescription: String,
    selfDescription: String,
    resume: String,
    matchScore: { type: Number, default: 0 },
    technicalQuestions: [
        {
            question: String,
            intention: String,
            answer: String
        }
    ],
    behavioralQuestions: [
        {
            question: String,
            intention: String,
            answer: String
        }
    ],
    skillGaps: [
        {
            skill: String,
            severity: String
        }
    ],
    preparationPlan: [
        {
            day: Number,
            focus: String,
            tasks: [String]
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("interviewReport", interviewReportSchema);