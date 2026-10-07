const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    topic: { type: String, required: true, index: true },
    text:  { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
