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

// index route - get - /posts
router.get("/:username/:slug", async (req, res, next) => {
  const slug = req.params.slug
  const username = req.params.username
  let isUser = true

  const user = await User.findOne({username})

  if(user) {
    Post.findOne({slug})
    .then((post) => {
        res.render("posts/show.liquid", {post, isUser})
    })
    .catch((err) => {
        res.json({err})
    })
  } else {
    next()
  }
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
router.get("/", async (req, res) => {
    const id = req.session.user._id

    const user = await User.findById(id)

    Post.find({author: id})
    .then((posts) => {
      res.render("posts/index.liquid", {posts, user})
    })
    .catch((error) => {
        res.json({error})
    })
})

// index route - get - /posts
router.get("/new", (req, res) => {
  console.log(req.session)
    res.render("posts/new.liquid")
})

// index route - new - /posts
router.post("/", async (req, res) => {
  console.log(req.user)
  const post = new Post({title: req.body.title, content: req.body.content, author: req.session.user._id });
  await post.save();
  res.redirect('/')
})

// index route - edit - /posts
router.put("/:slug", async (req, res) => {
    const slug = req.params.slug
  
    //Updating the item with the matching slug
    Post.findOneAndUpdate({slug}, req.body, { new: true })
      .then((post) => {
        // redirect user back to index
        res.redirect('/')
      })
      // error handling
      .catch((error) => {
        console.log(error)
        res.json({ error })
      })
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

// destroy route - delete request - /post/:id
router.delete("/:slug", (req, res) => {
    // grab the id from params
    const slug = req.params.slug
    // delete the fruit
    Post.findOneAndRemove({slug})
    .then((post) => {
        // redirect user back to index
        res.redirect("/")
    })
     // error handling
     .catch((error) => {
        res.json({error})
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
        res.redirect(`/${post.slug}`)
      } catch (e) {
        res.render(`posts/${path}`, { post: post })
      }
    }
  }


/////////////////////////////
// export the router
/////////////////////////////
module.exports = router