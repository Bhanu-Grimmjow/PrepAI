const Question = require("../models/question.model");
const Session  = require("../models/session.model");
const Answer   = require("../models/answer.model");
const { CATEGORIES, VALID_TOPICS } = require("../utils/categories");
const mongoose = require("mongoose");
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
            .limit(20)
            .select("topic status createdAt questions")
            .lean();

        const stats = await Answer.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user.id),
                    sessionId: { $in: sessions.map((session) => session._id) },
                },
            },
            {
                $group: {
                    _id: "$sessionId",
                    answered: { $sum: 1 },
                    avgScore: { $avg: "$overallScore" },
                },
            },
        ]);

        const statsBySessionId = Object.fromEntries(
            stats.map((stat) => [String(stat._id), stat])
        );

        return res.json({
            sessions: sessions.map((session) => {
                const stat = statsBySessionId[String(session._id)];

                return {
                    _id: session._id,
                    topic: session.topic,
                    status: session.status,
                    createdAt: session.createdAt,
                    totalQuestions: session.questions.length,
                    answered: stat?.answered ?? 0,
                    avgScore: stat
                        ? Math.round(stat.avgScore * 10) / 10
                        : null,
                };
            }),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function getSessionById(req, res) {
    try {
        const session = await Session.findOne({
            _id: req.params.id,
            userId: req.user.id,
        }).populate("questions", "text");

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        const answered = await Answer.find({
            sessionId: session._id,
            userId: req.user.id,
        })
            .select("questionIndex")
            .lean();

        const answeredIndexes = answered.map((answer) => answer.questionIndex);

        return res.json({
            session,
            answeredCount: answeredIndexes.length,
            answeredIndexes,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function getSessionSummary(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({ message: "Session not found" });
        }

        const session = await Session.findOne({
            _id: id,
            userId: req.user.id,
        });

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        const answers = await Answer.find({
            sessionId: session._id,
            userId: req.user.id,
        })
            .select("questionIndex question transcript scores overallScore strengths weaknesses suggestion createdAt")
            .sort({ questionIndex: 1 })
            .lean();

        const dimensions = ["clarity", "relevance", "technicalAccuracy", "confidence"];
        const average = (values) =>
            Math.round(
                (values.reduce((sum, value) => sum + value, 0) / values.length) * 10
            ) / 10;

        let stats = null;

        if (answers.length > 0) {
            const averages = {};

            dimensions.forEach((dimension) => {
                averages[dimension] = average(
                    answers.map((answer) => answer.scores[dimension])
                );
            });

            const weakest = dimensions.reduce((lowest, dimension) =>
                averages[dimension] < averages[lowest] ? dimension : lowest
            );

            stats = {
                overall: average(answers.map((answer) => answer.overallScore)),
                averages,
                weakest,
            };
        }

        return res.json({
            session: {
                _id: session._id,
                topic: session.topic,
                status: session.status,
                createdAt: session.createdAt,
            },
            totalQuestions: session.questions.length,
            answers,
            stats,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = { getTopics, createSession, getSessions, getSessionById,getSessionSummary};
