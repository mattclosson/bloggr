///////////////////////////////////
// Import our Dependencies
///////////////////////////////////
require("dotenv").config() // brings in .env vars
const express = require("express") // web framework
const morgan = require("morgan") // logger
const methodOverride = require("method-override") // to swap request methods
const path = require("path") // helper functions for file paths
const PostsRouter = require("./controllers/post")
const UserRouter = require("./controllers/user")
const session = require("express-session") // session middleware
const MongoStore = require("connect-mongo") // save sessions in mongo

/////////////////////////////////
// Create our app with object, configure liquid
/////////////////////////////////
// import liquid
const liquid = require("liquid-express-views")
// construct an absolute path to our views folder
const viewsFolder = path.resolve(__dirname, "views/")


// create an app object with liquid, passing the path to the views folder
const app = liquid(express(), {root: viewsFolder})


/////////////////////////////////////////////
// Register Our Middleware
/////////////////////////////////////////////
// logging
app.use(morgan("tiny"))
// ability to override request methods
app.use(methodOverride("_method"))
// ability to parse urlencoded from for submission
app.use(express.urlencoded({extended: true}))
// setup our public folder to serve files statically
app.use(express.static("public"))
// middlware to create sessions (req.session)
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    resave: false,
    saveUninitialized: true
}))


// route
app.get("/", (req, res) => {
    res.send("This App is working")
})

// Register Posts Router
app.use("/post", PostsRouter)

// Register User Router
app.use("/user", UserRouter)

// listener
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`listening on port ${PORT}`))