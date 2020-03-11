const express = require('express');
const cors = require('cors')

const server = express();
const helmet =require("helmet")
const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')

//plug the parsing ability
server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(logger())

//UserRoute
server.use("/api/users",userRouter);
//PostRouter
server.use("/api/posts",postRouter);



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
