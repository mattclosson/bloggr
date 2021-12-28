const express = require("express") // express for Router function
const Post = require("../models/post.js") // post model
const User = require("../models/user.js") // post model
const mongoose = require("../models/connection")

const router = express.Router()


module.exports = router