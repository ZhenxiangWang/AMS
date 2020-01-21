/*
Application startup module
1. Start the server through Express
2. Connect to the database through Mongoose
Note: start the server only after connecting to the database
3. Use middleware
 */
const mongoose = require("mongoose");
const express = require("express");
const app = express(); // 产生应用对象

// 声明使用静态中间件
app.use(express.static("public"));
// 声明使用解析post请求的中间件
app.use(express.urlencoded({ extended: true })); // 请求体参数是: name=tom&pwd=123
app.use(express.json()); // 请求体参数是json结构: {name: tom, pwd: 123}
// 声明使用解析cookie数据的中间件
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// 声明使用路由器中间件
const indexRouter = require("./routers");
app.use("/", indexRouter); //

const fs = require("fs");

// 必须在路由器中间之后声明使用
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

// 通过mongoose连接数据库
mongoose
  .connect("mongodb://localhost/server_db2", { useNewUrlParser: true })
  .then(() => {
    console.log("Database connect success!");
    // 只有当连接上数据库后才去启动服务器
    app.listen("5000", () => {
      console.log("Server started. Please visit: http://localhost:5000");
    });
  })
  .catch(error => {
    console.error("Database connect failed", error);
  });
