// 載入 express 並建構應用程式伺服器
const express = require("express");
const session = require("express-session") //載入express-session
const exphbs = require("express-handlebars"); //載入handlebars
const bodyParser = require("body-parser"); // 引用 body-parser
const methodOverride = require("method-override"); // 載入methodOverride
const flash = require("connect-flash")  // 引用套件


const routes = require("./routes");
const usePassport = require("./config/passport") // 載入設定檔，要寫在 express-session 以後
require("./config/mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true
  })
);
app.use(bodyParser.urlencoded({ extended: true }));// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(methodOverride("_method"));

usePassport(app) // 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
app.use(flash())  // 引用套件

app.use((req, res, next) => {
  // 可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg"); // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash("warning_msg"); // 設定 warning_msg 訊息
  next();
})
// 設定首頁路由
app.use(routes);

// 設定 
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
