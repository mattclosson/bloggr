/////////////////////////////
//Import Dependencies
/////////////////////////////
const mongoose = require("./connection")
const Post = require("./post")

///////////////////////////////
// Seed Code
///////////////////////////////

// save the connection in it a variable
const db = mongoose.connection

// make sure code doesn't run till connection is open
db.on("open", () => {
    // array of starter posts
    const startPosts = [
        { title: "How to", slug: "how-to", author: "Tom", content: "something something something" },
        { title: "Rainy Day", slug: "rainy-day", author: "Sarah", content: "something something something" },
        { title: "Sunny Monday", slug: "sunny-monday", author: "John", content: "something something something" },
        { title: "New Planet", slug: "new-planet", author: "Rachel", content: "something something something" },
        { title: "Opinion", slug: "opinion", author: "Tom", content: "something something something" },
      ];

    // delete all posts
    Post.deleteMany({}).then((data) => {
        // seed the starter posts
        Post.create(startPosts).then((data) => {
            console.log(data)
            db.close()
        })
    })
})