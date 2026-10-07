const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    userId:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    topic:     { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    status:    {
        type:    String,
        enum:    ["not_started", "in_progress", "completed"],
        default: "not_started",
    },
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);
