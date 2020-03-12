const express = require("express");

const router = express.Router();

const users = require("./userDb");
const posts = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  // do your magic!
  res.status(201).json(req.body);
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  res.status(200).json(req.body);
});

router.get("/", (req, res) => {
  // do your magic!
  users.get(req.body)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        message: "error"
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  const {id} =req.params;
  users.getUserPosts(req.params.id)
    .then(post => {
      console.log(post)
      res.status(200).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "there was an error ,removing user was denied " });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const{id}=req.params;
  users.remove(req.params.id)
    .then(removed => {
      res.status(200).json(removed);
    })
    .catch(err => {
      res.status(400).json({ message: "issue" });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // do your magic!
  users.update(req.params.id, req.body)
    
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => console.log(err));
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  users.getById(id)
    .then(user => {
      console.log(user);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;