///////////////////////////////////
// import dependencies
///////////////////////////////////
// import the existing connected mongoose object from connection.js
const mongoose = require("./connection")

///////////////////////////////////////////
// Create our User Model
///////////////////////////////////////////
// destructuring Schema and model from mongoose
const {Schema, model} = mongoose 

// make a users schema
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    posts: [{type: Schema.Types.ObjectId, ref: "Post" }]
})

// Make the User Model
const User = model("User", userSchema)

///////////////////////////////////////
//export the user model
///////////////////////////////////////
module.exports = User