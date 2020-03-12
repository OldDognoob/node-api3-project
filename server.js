const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const usersRouter = require("./users/userRouter");
const postsRouter = require("./posts/postRouter");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/users", usersRouter);
server.use("/posts", postsRouter);

server.get("/friend", (req, res) => {
  res.send(`<h2>Hello, friend!</h2>`);
});

server.get("/:id", (req, res) => {
  res.send(`<h2>That is a nice ${req.params.id}</h2>`);
});

const users = [];

server.post(
  "/users",
  logger,
  (req, res) => {
    users.push({ id: req.cleanId, name: req.cleanName, post: req.cleanPost });
    res.status(201).json(users);
  }
);

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );

  next();
}

module.exports = server;
