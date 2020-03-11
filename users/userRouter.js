const express = require("express");
const posts = require("../posts/postDb");
const users = require("./userDb");

const router = express.Router();

//we are creating a new user
router.post("/", validateUser, (req, res) => {
  // do your magic!
  users
    .insert(req.body)
    .then(newUser => {
      req.status(201).json(newUser);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There is an error creating the new user" });
    });
});

router.post("/:id/posts", validateUserId(), validatePost(), (req, res) => {
  // do your magic!
  const infoToSend = { user_id: req.user.id, text: req.body.tex };
  posts
    .insert(info)
    .then(post => {
      req.status(201).json(post);
    })
    .catch(error => {
      req
        .status(500)
        .json({ message: "There is an error creating the new post" });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  users.get()
  .then(users=>{
    res.status(200).json(users);
  })
  .catch(error=>{
    res.status(500).json({message:"There is an error retrieving users"});
  });
});

router.get("/:id", validateUserId(),(req, res) => {
  // do your magic!
  // users.getById(req.params.id)
  // .then(user =>{
  //   res.status(200).json(user);
  // })
  // .catch(error =>{
  //   res.status(500).json({message:error.message})
  // })

  res.status(200).json(req.user);
});

router.get("/:id/posts",validateUserId(), (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
  .then(posts=>{
    req.status(200).json(posts);
  })
  .catch(error =>{
    res.status(500).json({message:"There is an error retrieving user posts"})
  })
});

router.delete("/:id",validateUserId(), (req, res) => {
  // do your magic!
 users.remove(req.params.id)
 .then(removedPost =>{
   req.status(200).json(removedPost);
 })
 .catch(error =>{
   res.status(400).json({message:"The user does not exist"});
 });
});

router.put("/:id",validateUserId(),validateUser(), (req, res) => {
  // do your magic!
users.update(req.params.id,req.body)
.then(user =>{
  req.status(202).json(user);
})
.catch(error =>{
  res.status(500).json({message:"There is a problem updating user"})
})
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
