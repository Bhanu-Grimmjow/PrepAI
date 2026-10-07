const Question = require("../models/question.model");
const Session  = require("../models/session.model");
const { CATEGORIES, VALID_TOPICS } = require("../utils/categories");

async function getTopics(req, res) {
    res.json({ categories: CATEGORIES });
}

async function createSession(req, res) {
    try {
        const { topic } = req.body;

        if (!topic || !VALID_TOPICS.has(topic)) {
            return res.status(400).json({ message: "Invalid or missing topic" });
        }

        const questions = await Question.aggregate([
            { $match: { topic } },
            { $sample: { size: 5 } },
        ]);

        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found for this topic" });
        }

        const session = await Session.create({
            userId:    req.user.id,
            topic,
            questions: questions.map((q) => q._id),
        });

        res.status(201).json({
            sessionId: session._id,
            topic:     session.topic,
            status:    session.status,
            questions: questions.map((q) => ({ _id: q._id, text: q.text })),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getSessions(req, res) {
    try {
        const sessions = await Session.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .select("topic status createdAt");

        res.json({ sessions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getSessionById(req, res) {
    try {
        const session = await Session.findOne({
            _id:    req.params.id,
            userId: req.user.id,
        }).populate("questions", "text");

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        res.json({ session });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getTopics, createSession, getSessions, getSessionById };
