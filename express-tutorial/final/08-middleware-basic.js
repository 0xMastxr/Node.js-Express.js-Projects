const express = require("express")
const app = express()

//  req => middleware => res

const logger = (req, res, next) => {
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    next() //If we don't pass any data (res.send) we simply go with next()
} //This way we can use this logic on every app.get we have and invoke this logic everywhere we want

app.get("/", logger, (req, res) => {
    //logger function in the middle-> Express passes it the data it needs (req,res,next) behind the scenes
    res.send("Home")
})
app.get("/about", logger, (req, res) => {
    res.send("About")
})

app.listen(5000, () => {
    console.log("Server is listening on port 5000....")
})
