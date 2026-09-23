const express = require("express");
const cors = require("cors");
const authRouter= require("./routes/auth.routes")
const app = express();
const cookieParser = require("cookie-parser");


app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());
/* use routes */
app.use("/api/auth",authRouter)



module.exports = app;
