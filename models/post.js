// import dependencies
// import the existing connected mongoose object from connection.js
const mongoose = require("./connection")

// Create our Posts Model
// destructuring Schema and model from mongoose
const {Schema, model} = mongoose 
// const slugify = require("slugify")
const slug = require('mongoose-slug-generator')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
const marked = require('marked')

mongoose.plugin(slug)

// make a posts schema
const postSchema = new Schema({
    title: {type: String, required: true},
    slug: {type: String, slug: "title", unique: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    sanitizedHtml: {type: String, required: true},

})

postSchema.pre('validate', function(next) {
    if (this.content) {
      this.sanitizedHtml = dompurify.sanitize(marked(this.content))
    }
  
    next()
})

// Make the Post Model
const Post = model("Post", postSchema)

//export the post model
module.exports = Post