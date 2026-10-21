const Answer             = require("../models/answer.model");
const Session            = require("../models/session.model");
const { evaluateAnswer } = require("../services/ai.service");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function submitAnswer(req, res) {
    try {
        const { sessionId } = req.params;
        const { transcript, questionIndex } = req.body;

        if (!transcript || transcript.trim().length < 20 || transcript.trim().length > 3000) {
            return res.status(400).json({ message: "Answer must be between 20 and 3000 characters" });
        }

        const session = await Session.findOne({ _id: sessionId, userId: req.user.id })
            .populate("questions", "text");

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        if (!Number.isInteger(questionIndex) || questionIndex < 0 || questionIndex >= session.questions.length) {
            return res.status(400).json({ message: "Invalid question" });
        }

        const already = await Answer.findOne({ sessionId, userId: req.user.id, questionIndex });
        if (already) return res.status(409).json({ message: "This question is already answered" });

        const question = session.questions[questionIndex].text;

        let feedback;
        try {
            feedback = await evaluateAnswer(question, transcript.trim());
        } catch {
            await sleep(1000); // short pause before the one retry
            try {
                feedback = await evaluateAnswer(question, transcript.trim());
            } catch {
                return res.status(502).json({ message: "AI scoring failed. Please try again." });
            }
        }

        const answer = await Answer.create({
            sessionId,
            userId:        req.user.id,
            questionIndex,
            question,
            transcript:    transcript.trim(),
            scores:        feedback.scores,
            overallScore:  feedback.overallScore,
            strengths:     feedback.strengths,
            weaknesses:    feedback.weaknesses,
            suggestion:    feedback.suggestion,
        });

        const total = await Answer.countDocuments({ sessionId, userId: req.user.id });
        session.status = total >= session.questions.length ? "completed" : "in_progress";
        await session.save();

        res.status(201).json({ answer });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: "This question is already answered" });
        }
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { submitAnswer };