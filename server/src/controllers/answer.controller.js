const mongoose           = require("mongoose");
const Answer             = require("../models/answer.model");
const Session            = require("../models/session.model");
const { evaluateAnswer } = require("../services/ai.service");

const sleep   = (ms) => new Promise((r) => setTimeout(r, ms));
const wordsOf = (text) => text.toLowerCase().match(/[a-z']+/g) || [];

// obvious junk: long repeated characters, or mostly non-words
function isGibberish(text) {
    if (/([^\s])\1{5,}/.test(text)) return true;
    const words = wordsOf(text);
    if (words.length === 0) return true;
    const wordLike = words.filter((w) => w.length <= 18 && /[aeiouy]/.test(w));
    return wordLike.length / words.length < 0.6;
}

const zeroFeedback = () => ({
    scores:       { clarity: 0, relevance: 0, technicalAccuracy: 0, confidence: 0 },
    overallScore: 0,
    strengths:    [],
    weaknesses:   ["Not a genuine answer"],
    suggestion:   "Answer in complete sentences, using what you know about the topic.",
});

// one retry after a short pause; returns null if both attempts fail
async function scoreWithRetry(question, text) {
    try {
        return await evaluateAnswer(question, text);
    } catch {
        await sleep(1000);
        try {
            return await evaluateAnswer(question, text);
        } catch {
            return null;
        }
    }
}

async function submitAnswer(req, res) {
    try {
        const { sessionId } = req.params;
        const { transcript, questionIndex } = req.body;

        if (!mongoose.isValidObjectId(sessionId)) {
            return res.status(404).json({ message: "Session not found" });
        }
        if (typeof transcript !== "string" || transcript.trim().length < 20 || transcript.trim().length > 3000) {
            return res.status(400).json({ message: "Answer must be between 20 and 3000 characters" });
        }

        const clean = transcript.trim();
        const junk  = isGibberish(clean);

        // a real but very short answer is not junk, so let the user fix it
        if (!junk && wordsOf(clean).length < 5) {
            return res.status(400).json({ message: "Please write at least a full sentence." });
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

        // junk gets 0 without an AI call; everything else is scored by the AI
        let feedback = zeroFeedback();
        if (!junk) {
            feedback = await scoreWithRetry(question, clean);
            if (!feedback) {
                return res.status(502).json({ message: "AI scoring failed. Please try again." });
            }
        }

        const answer = await Answer.create({
            sessionId,
            userId:        req.user.id,
            questionIndex,
            question,
            transcript:    clean,
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
