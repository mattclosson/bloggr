//////////////////////////////
// Import Dependencies
//////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

///////////////////////////////
// Create Router
///////////////////////////////
const router = express.Router();


////////////////////////////
// ROUTES
////////////////////////////

router.get("/signup", (req, res) => {
  res.render("user/signup.liquid");
});

router.post("/signup", async (req, res) => {
  // encrypt password
  req.body.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );
  // create the new user
  User.create(req.body)
  .then((user) => {
    //redirect to login page
    res.redirect('/login')
  })
  .catch((err) => {
    res.json({err})
  })
});

router.get("/login", (req, res) => {
  res.render("user/login.liquid");
});

router.post("/login", (req, res) => {
  // get username and password
  const { username, password } = req.body;
  // check if user exists
  User.findOne({ username }, async (err, user) => {
    // handle if user doesn't exist
    if (err) res.send("user doesn't exist");
    // compare passwords
    const result = await bcrypt.compare(password, user.password);
    // check is match was a success
    if (!result) res.send("wrong password");
    // save login info in sessions
    req.session.loggedIn = true
    req.session.username = username
    // redirect to posts page
    res.redirect("/posts");
  });
});

// // index route - new - /posts
// router.post("/", (req, res) => {
//   Post.create(req.body)
//   .then((post) => {
//       res.redirect('/post')
//   })
//   .catch((err) => {
//       res.json({err})
//   })
// })


////////////////////////////////
// export the router
/////////////////////////////////
module.exports = router;