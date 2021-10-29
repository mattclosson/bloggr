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
// const slugify = require("slugify")
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

// make a posts schema
const postSchema = new Schema({
    title: {type: String, required: true},
    slug: {type: String, slug: "title", unique: true},
    author: String,
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}

})

// postSchema.pre('save', (next) => {
//     this.slug = slugify(this.title, { lower: true, strict: true})
    
//     next()
// })

// postSchema.pre('save', (next) => {
//     this.slug = this.title.split(" ").join("-")
    
//     next()
// })

// Make the Post Model
const Post = model("Post", postSchema)

///////////////////////////////////////
//export the post model
///////////////////////////////////////
module.exports = Post