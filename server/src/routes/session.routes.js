const express    = require("express");
const { rateLimit } = require("express-rate-limit");
const router     = express.Router();
const { authUser } = require("../middlewares/auth.middleware");
const sessionCreationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 10,
    keyGenerator: (req) => req.user.id,
    message: {
        message: "Too many sessions created. Please wait before trying again.",
    },
});
const {
    getTopics,
    createSession,
    getSessions,
    getSessionById,
    getSessionSummary
} = require("../controllers/session.controller");

router.get("/topics", getTopics);
router.get("/",       authUser, getSessions);
router.post("/", authUser, sessionCreationLimiter, createSession);
router.get("/:id/summary", authUser, getSessionSummary);
router.get("/:id", authUser, getSessionById);

module.exports = router;
