const express      = require("express");
const { rateLimit } = require("express-rate-limit");

const router       = express.Router({ mergeParams: true });
const { authUser } = require("../middlewares/auth.middleware");
const { submitAnswer } = require("../controllers/answer.controller");
const answerLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
    keyGenerator: (req) => req.user.id,
    message: {
        message: "Too many answers. Please wait a minute and try again.",
    },
});

router.post("/", authUser, answerLimiter, submitAnswer);

module.exports = router;
