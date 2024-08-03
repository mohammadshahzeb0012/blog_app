const express = require("express")
const clc = require("cli-color")
require("dotenv").config()
const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);

//file-imports
const db = require("./db")
const authRouter = require("./routers/authRouter")
const blogRouter = require("./routers/blogRouter");
const followRouter = require("./routers/followRouter");
const isAuth = require("./middlewares/isAuthMiddleware");
const cleanUpBin = require("./cron");


//constatnts
const app = express()
const PORT = process.env.PORT
const store = new mongodbSession({
  uri: process.env.MONGO_URI,
  collection: "sessions",
})


//middlewares
app.use(express.json())
app.use(session({
  secret: process.env.SECRET_KEY,
  store: store,
  resave: false,
  saveUninitialized: false
}))


app.get("/", (req, res) => {
  res.send("server is running")
})
app.use('/auth', authRouter)
app.use('/blog', isAuth, blogRouter)
app.use('/follow', isAuth, followRouter)

app.listen(PORT, () => {
  console.log(
    clc.yellowBright.bold.underline(`server is running on PORT:${PORT}`)
  );
});