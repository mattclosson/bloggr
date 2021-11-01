// Import our Dependencies
const express = require("express") // web framework
const path = require("path")
require("dotenv").config(); // Load ENV Variables
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const PostRouter = require("./controllers/post");
const UserRouter = require("./controllers/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// Create our app with object, configure liquid
// import liquid
const liquid = require("liquid-express-views")
// construct an absolute path to our views folder
const viewsFolder = path.resolve(__dirname, "views/")


// create an app object with liquid, passing the path to the views folder
const app = liquid(express(), {root: viewsFolder})


app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
  })
);

app.use("/posts", PostRouter);
app.use("/user", UserRouter);

// server listener
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`listening on port ${PORT}`))