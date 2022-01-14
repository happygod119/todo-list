// 載入 express 並建構應用程式伺服器
const express = require("express");
const app = express();

const bodyParser = require("body-parser"); // 引用 body-parser

const Todo = require("./models/todo"); // 載入 Todo model

const exphbs = require("express-handlebars"); //載入handlebars

const mongoose = require("mongoose"); // 載入 mongoose
const res = require("express/lib/response");
const todo = require("./models/todo");
const methodOverride = require("method-override"); // 載入methodOverride

const routes = require("./routes");
const router = require("./routes/modules/home");

mongoose.connect("mongodb://localhost/todo-list"); // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection;

// 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});
// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

// 設定首頁路由
app.use(routes);

// // 新增一筆 To-do
// app.get("/todos/new", (req, res) => {
//   return res.render("new");
// });

// app.post("/todos", (req, res) => {
//   const name = req.body.name; // 從 req.body 拿出表單裡的 name 資料
//   //- 直接操作Todo
//   return Todo.create({ name }) // 存入資料庫
//     .then(() => res.redirect("/")) // 新增完成後導回首頁
//     .catch((error) => console.log(error));

//   //- 先產生物件實例，再存入Todo
//   // const todo = new Todo({ name })
//   // return todo
//   //   .save()
//   //   .then(() => res.redirect("/"))
//   //   .catch((error) => console.log(error));
// });

// // 瀏覽特定 To-do
// app.get("/todos/:id", (req, res) => {
//   const id = req.params.id;
//   return Todo.findById(id)
//     .lean()
//     .then((todo) => res.render("detail", { todo }))
//     .catch((error) => console.log(error));
// });

// // 修改特定 To-do
// app.get("/todos/:id/edit", (req, res) => {
//   const id = req.params.id;
//   return Todo.findById(id)
//     .lean()
//     .then((todo) => res.render("edit", { todo }))
//     .catch((error) => console.log(error));
// });

// app.put("/todos/:id", (req, res) => {
//   const id = req.params.id;
//   // const name = req.body.name;
//   // const isDone = req.body.isDone;
//   const { name, isDone } = req.body; //-  解構賦值
//   return Todo.findById(id)
//     .then((todo) => {
//       todo.name = name;
//       todo.isDone = isDone === "on";
//       // if (isDone === "on") {
//       //   todo.isDone = true;
//       // } else {
//       //   todo.isDone = false;
//       // }

//       return todo.save();
//     })
//     .then(() => res.redirect(`/todos/${id}`))
//     .catch((error) => console.log(error));
// });

// // 刪除特定 To-do
// app.delete("/todos/:id", (req, res) => {
//   const id = req.params.id;
//   return Todo.findById(id)
//     .then((todo) => todo.remove())
//     .then(() => res.redirect("/"))
//     .catch((error) => console.log(error));
// });

// 設定 port 3000
app.listen(3000, () => {
  console.log("App is running on http://localhost:3000");
});
