const Answer  = require("../models/answer.model");
const Session = require("../models/session.model");

async function submitAnswer(req, res) {
    try {
        const { sessionId } = req.params;
        const { question, transcript } = req.body;

        if (!question || !transcript) {
            return res.status(400).json({ message: "question and transcript are required" });
        }

        const session = await Session.findOne({ _id: sessionId, userId: req.user.id });

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        const fakeScores = {
            clarity:           7,
            relevance:         8,
            technicalAccuracy: 6,
            confidence:        7,
        };

        const answer = await Answer.create({
            sessionId,
            userId:      req.user.id,
            question,
            transcript,
            scores:      fakeScores,
            overallScore: 7,
            strengths:   ["Clear structure", "Good use of an example"],
            weaknesses:  ["Could be more concise"],
            suggestion:  "Try to directly answer the question in your first sentence.",
        });

        if (session.status === "not_started") {
            session.status = "in_progress";
            await session.save();
        }

        res.status(201).json({ answer });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { submitAnswer };
