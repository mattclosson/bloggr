// import deps
const express = require("express")


// app object
const app = express()


// route
app.get("/", (req, res) => {
    res.send("This App is working")
})

// listener
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`listening on port ${PORT}`))