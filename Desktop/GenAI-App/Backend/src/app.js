const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()


// 🟢 Sabse pehle CORS middleware (Routes se pehle aana compulsory hai!)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser())


/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app