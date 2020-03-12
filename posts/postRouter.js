const express = require("express");

const router = express.Router();
const posts = require("../posts/postDb");

router.get("/", (req, res) => {
  posts.get(req.body)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        message: "error"
      });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.body);
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  const{id}=req.params;
  posts.remove(req.params.id)
    .then(removed => {
      res.status(200).json(removed);
    })
    .catch(err => {
      res.status(400).json({ message: "We have an issue" });
    });
});

router.put("/:id", validatePost, validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.body);
});


function validatePost(req, res, next) {
  // do your magic!
   if (!req.body) {
    res.status(400).json({ message: "missing required valid text and valid user_id field" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing post data" });
  } else {
    next();
  }
}

function validatePostId(req, res, next) {
  const { id } = req.params;
  posts.getById(id)
    .then(post => {
      console.log(post);
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: "invalid post id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
}

module.exports = router;