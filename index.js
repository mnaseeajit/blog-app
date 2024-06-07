
const express = require("express");
require("dotenv").config();
const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(session);

// file imports
const db = require("./db");
const AuthRouter = require("./Routers/AuthRouter");
const BlogRouter = require("./Routers/BlogRouter");
const followRouter = require("./Routers/followRouter");

//constants
const PORT = process.env.PORT || 8001;
const app = express();
const store = new mongoDbSession({
   uri : process.env.URI,
   collection : "sessions",
})

//middleware
app.use(express.json());
app.use(
     session({
          secret : process.env.SECRET_KEY,
          store : store,
          resave : false,
          saveUninitialized : false,
     })
)

//auth/register
app.use('/auth',AuthRouter);
app.use('/blog', BlogRouter);
app.use('/follow',followRouter)


app.listen(PORT,()=>{
     console.log(`server is running on port ${PORT}`);
})