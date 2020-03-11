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



server.get('/friend',(req,res)=>{
  res.send(`<h2>Hello,friend!</h2>`);
})

server.get('/:id', (req, res) => {
  res.send(`<h2>That is a nice id: ${req.params.id}</h2>`);
})


const users = [];

server.post('/users',logger,(req,res)=>{
users.push({name:req.cleanName, age:req.cleanAge})
res.status(201).json(users);
});


//custom middleware

function logger(req, res, next) {}
console.log(`${req.method} ${req.path}`);
  next();

module.exports = server;
