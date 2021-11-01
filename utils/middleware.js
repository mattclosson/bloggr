// Dependencies
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const PostRouter = require("../controllers/post");
const UserRouter = require("../controllers/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// MiddleWare Function
const middleware = (app) => {
  app.use(morgan("tiny")); //logging
  app.use(methodOverride("_method")); // override for put and delete requests from forms
  app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
  app.use(express.static("public")); // serve files from public statically
  app.use("/", PostRouter);
  app.use("/user", UserRouter);
};

// Export Middleware Function
module.exports = middleware