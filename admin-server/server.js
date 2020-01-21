/*
Application startup module
1. Start the server through Express
2. Connect to the database through Mongoose
Note: start the server only after connecting to the database
3. Use middleware
 */
const mongoose = require("mongoose");
const express = require("express");
const app = express(); // Generate application objects

// Declare using static Middleware
app.use(express.static("public"));
// Declare using middleware to resolve post requests
app.use(express.urlencoded({ extended: true })); // The request body parameters are: name=tom&pwd=123
app.use(express.json()); // The request body parameter is a JSON structure: {name: tom, pwd: 123}
// Declare middleware for parsing cookie data
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// Declare using router Middleware
const indexRouter = require("./routers");
app.use("/", indexRouter); //

const fs = require("fs");

// Use must be declared after the middle of the router
/*app.use((req, res) => {
  fs.readFile(__dirname + '/public/index.html', (err, data)=>{
    if(err){
      console.log(err)
      res.send('后台错误')
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      });
      res.end(data)
    }
  })
})*/

// Connect to the database through Mongoose
mongoose
  .connect("mongodb://localhost/server_db2", { useNewUrlParser: true })
  .then(() => {
    console.log("Database connect success!");
    // Start the server only after connecting to the database
    app.listen("5000", () => {
      console.log("Server started. Please visit: http://localhost:5000");
    });
  })
  .catch(error => {
    console.error("Database connect failed", error);
  });
