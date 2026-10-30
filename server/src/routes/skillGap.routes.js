const express = require("express");
const { rateLimit } = require("express-rate-limit");
const router = express.Router();
const { analyzeSkillGap } = require("../controllers/skillGap.controller");

const { authUser } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const skillGapLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  keyGenerator: (req) => req.user.id,
  message: {
    message: "Too many skill-gap analyses. Please wait an hour and try again.",
  },
});
router.post(
  "/analyze",
  authUser,
  skillGapLimiter,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "jobDescription", maxCount: 1 },
  ]),
  analyzeSkillGap
);

module.exports = router;
