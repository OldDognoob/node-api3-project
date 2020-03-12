const Posts = require("../posts/postDb");
const User = require("../users/userDb");

//custom middleware

function validateUserId(req, res, next) {
    // do your magic!
    getById(req.params.id)
      .then(user => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({ message: "User id does not exist." });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "There is an error"
        });
      });
   
  
      function validateUser(req, res, next) {
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
    };
  
  }

 module.exports = middleware;

