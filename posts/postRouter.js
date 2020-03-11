const express = require("express");
const posts = require("./postDb");
const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  posts
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: "error" });
    });
});

router.get("/:id", validatePostId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId(), (req, res) => {
  // do your magic!
  posts
    .remove(req.params.id)
    .then(removedPost => {
      res.status(200).json(removedPost);
    })
    .catch(error => {
      res.status(400).json({ message: "The post is not there" });
    });
});

router.put("/:id", validatePost(), validatePostId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.body);
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  
  posts.getById(req.params.id)
  .then((post) => {
    if(post) {
      req.post = post
      next()
    } else {
      res.status(400).json({message: "invalid post id"})
    }
  })
  .catch(err => {
    next(err)
  })



  
}


module.exports = router;
