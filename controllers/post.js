const express = require("express") // express for Router function
const Post = require("../models/post.js") // post model
const User = require("../models/user.js") // post model
const mongoose = require("../models/connection")

const router = express.Router()

// index route - get - /posts
router.get("/:username/:slug", (req, res, next) => {
    const slug = req.params.slug
    const username = req.params.username
  
    User.findOne({username: username})
    .populate('posts')
    .then((post) => {
      console.log(post)
    })
    .catch((err) => {
      console.log(err)
    })
  
    Post.findOne({slug})
    .then((post) => {
        res.render("posts/show.liquid", {post})
    })
    .catch((err) => {
        res.json({err})
    })
  })
  
  // index route - get - /posts
  router.get("/:username", async (req, res, next) => {
    const username = req.params.username
    const user = await User.findOne({username})
  
    if(user) {
        const id = user._id
        Post.find({author: id})
        .then((posts) => {
          res.render("posts/index.liquid", {posts, user})
        })
        .catch((err) => {
          res.json(err)
        })
    } else {
        next()
    }
  })

module.exports = router