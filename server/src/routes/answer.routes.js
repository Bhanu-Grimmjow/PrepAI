const express      = require("express");
const router       = express.Router({ mergeParams: true });
const { authUser } = require("../middlewares/auth.middleware");
const { submitAnswer } = require("../controllers/answer.controller");

router.post("/", authUser, submitAnswer);

module.exports = router;
