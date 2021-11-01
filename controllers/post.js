/////////////////////////
// Import Dependencies
/////////////////////////
const express = require("express") // express for Router function
const Post = require("../models/post.js") // post model
const User = require("../models/user.js") // post model
const mongoose = require("../models/connection")
const toId = mongoose.Types.ObjectId

// create router
const router = express.Router()

// Router Middleware

// middleware to check if user is logged in
router.use((req, res, next) => {
    if (req.session.loggedIn) {

      next();
    } else {
      res.redirect("/user/login");
    }
  });


// Posts Routes
// index route - get - /posts
router.get("/", (req, res) => {
    Post.find()
    .then((posts) => {
        res.render("posts/index.liquid", {posts})
    })
    .catch((error) => {
        res.json({error})
    })
})

// index route - get - /posts
router.get("/new", (req, res) => {
    res.render("posts/new.liquid")
})

// index route - new - /posts
router.post("/", async (req, res) => {
        console.log(req.user)
        const post = new Post({title: req.body.title, content: req.body.content });
        await post.save();
        res.redirect('/posts')
})
// edit route - get 
router.get("/:slug/edit", (req, res) => {
    const slug = req.params.slug

    Post.findOne({slug})
    .then((post) => {
        res.render("posts/edit.liquid", {post})
    })
    .catch((err) => {
        res.json({err})
    })
})

// index route - edit - /posts
router.put("/:slug", async (req, res) => {
    const slug = req.params.slug

    //Updating the item with the matching slug
    Post.findOneAndUpdate({slug}, req.body, { new: true })
      .then((post) => {
        // redirect user back to index
        res.redirect('/posts')
      })
      // error handling
      .catch((error) => {
        console.log(error)
        res.json({ error })
      })
  })
// destroy route - delete request - /post/:id
router.delete("/:slug", (req, res) => {
    // grab the id from params
    const slug = req.params.slug
    // delete the fruit
    Post.findOneAndRemove({slug})
    .then((post) => {
        // redirect user back to index
        res.redirect("/posts")
    })
     // error handling
     .catch((error) => {
        res.json({error})
    })
})

// index route - get - /posts
router.get("/:slug", (req, res) => {
    const slug = req.params.slug

    Post.findOne({slug})
    .then((post) => {
        res.render("posts/show.liquid", {post})
    })
    .catch((err) => {
        res.json({err})
    })
})


function savePostAndRedirect(path) {
    return async (req, res) => {
      let post = req.post
      post.title = req.body.title
      post.description = req.body.description
      post.content = req.body.content
      try {
        article = await article.save()
        res.redirect(`/posts/${post.slug}`)
      } catch (e) {
        res.render(`posts/${path}`, { post: post })
      }
    }
  }


/////////////////////////////
// export the router
/////////////////////////////
module.exports = router