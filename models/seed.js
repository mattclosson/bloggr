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
        { title: "How to", slug: "how-to", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus dolor nec neque vestibulum, at volutpat nisl euismod. Nam vel metus in nulla faucibus consequat. Duis elementum lorem nec velit elementum molestie. Donec non velit eros. Etiam eget venenatis massa. Etiam dapibus commodo vestibulum. Mauris ut commodo dui. Sed sed varius leo." },
        { title: "Rainy Day", slug: "rainy-day", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ornare in lacus sit amet blandit. Etiam rhoncus efficitur maximus. In non elit at neque egestas lobortis et ac orci. Nunc ac finibus magna. Pellentesque at odio quis nisl dignissim sollicitudin. Aenean sed felis ac nisi fringilla consequat non ac arcu. Nullam mauris lectus, porta eu sapien ac, interdum venenatis nisl. Aliquam efficitur ligula libero, id mollis quam dapibus id. Nulla hendrerit eu risus at blandit. Aenean in venenatis ipsum. Praesent pulvinar mauris euismod, accumsan tortor sit amet, volutpat turpis. Etiam ut fringilla velit. Integer posuere et risus vitae molestie. In hac habitasse platea dictumst. Nam sed facilisis augue." },
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