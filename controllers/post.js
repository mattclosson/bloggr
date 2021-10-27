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

// middleware to check if user is logged in
router.use((req, res, next) => {
    // check if logged in
    if (req.session.loggedIn){
        // send to routes
        next()
    } else {
        res.redirect("/user/login")
    }
})


////////////////////////
// Posts Routes
////////////////////////
// index route - get - /posts
router.get("/", (req, res) => {
    res.send("index")
})


/////////////////////////////
// export the router
/////////////////////////////
module.exports = router