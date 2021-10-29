/////////////////////////
// Import Dependencies
/////////////////////////
const express = require("express") // express for Router function
const Post = require("../models/post.js") // fruit model

//////////////////
// create router
//////////////////
const router = express.Router()

/////////////////////////////////
// Router Middleware
/////////////////////////////////

// // middleware to check if user is logged in
// router.use((req, res, next) => {
//     // check if logged in
//     if (req.session.loggedIn){
//         // send to routes
//         next()
//     } else {
//         res.redirect("/user/login")
//     }
// })


////////////////////////
// Posts Routes
////////////////////////
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

// index route - get - /posts
router.post("/", (req, res) => {
    Post.create(req.body)
    .then((post) => {
        res.redirect('/post')
    })
    .catch((err) => {
        res.json({err})
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

// index route - get - /posts
router.put("/:slug", (req, res) => {
    const slug = req.params.slug

    Post.findOneAndUpdate({slug}, req.body, {new:true})
    .then((post) => {
        res.redirect(`/post/${slug}`)
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
        res.redirect("/post")
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


/////////////////////////////
// export the router
/////////////////////////////
module.exports = router