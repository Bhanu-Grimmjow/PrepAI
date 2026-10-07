const express       = require("express");
const cors          = require("cors");
const cookieParser  = require("cookie-parser");
const authRouter    = require("./routes/auth.routes");
const sessionRouter = require("./routes/session.routes");
const answerRouter  = require("./routes/answer.routes");

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",                        authRouter);
app.use("/api/sessions",                    sessionRouter);
app.use("/api/sessions/:sessionId/answers", answerRouter);

module.exports = app;
