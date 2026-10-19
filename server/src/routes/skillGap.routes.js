const express = require("express");
const router = express.Router();
const { analyzeSkillGap } = require("../controllers/skillGap.controller");

const { authUser } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

router.post(
  "/analyze",
  authUser,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "jobDescription", maxCount: 1 },
  ]),
  analyzeSkillGap
);

module.exports = router;
