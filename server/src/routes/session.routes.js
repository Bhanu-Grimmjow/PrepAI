const express    = require("express");
const router     = express.Router();
const { authUser } = require("../middlewares/auth.middleware");
const {
    getTopics,
    createSession,
    getSessions,
    getSessionById,
} = require("../controllers/session.controller");

router.get("/topics", getTopics);
router.get("/",       authUser, getSessions);
router.post("/",      authUser, createSession);
router.get("/:id", authUser, getSessionById);

module.exports = router;
