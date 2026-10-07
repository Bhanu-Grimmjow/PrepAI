const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    sessionId:    { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true },
    userId:       { type: mongoose.Schema.Types.ObjectId, ref: "User",    required: true },
    question:     { type: String, required: true },
    transcript:   { type: String, required: true },
    scores: {
        clarity:           { type: Number, default: 0 },
        relevance:         { type: Number, default: 0 },
        technicalAccuracy: { type: Number, default: 0 },
        confidence:        { type: Number, default: 0 },
    },
    overallScore: { type: Number, default: 0 },
    strengths:    [String],
    weaknesses:   [String],
    suggestion:   { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Answer", answerSchema);
