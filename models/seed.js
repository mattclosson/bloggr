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
        { title: "How to", slug: "how-to", content: "something something something" },
        { title: "Rainy Day", slug: "rainy-day", content: "something something something" },
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