///////////////////////////////////
// import dependencies
///////////////////////////////////
// import the existing connected mongoose object from connection.js
const mongoose = require("./connection")

///////////////////////////////////////////
// Create our Posts Model
///////////////////////////////////////////
// destructuring Schema and model from mongoose
const {Schema, model} = mongoose 

// make a posts schema
const postSchema = new Schema({
    title: String,
    slug: String,
    author: String,
    content: String,
    comments: [String]
})

// Make the Post Model
const Post = model("Post", postSchema)

///////////////////////////////////////
//export the post model
///////////////////////////////////////
module.exports = Post