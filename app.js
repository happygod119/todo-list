// 載入 express 並建構應用程式伺服器
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require("body-parser"); // 引用 body-parser

const Todo = require("./models/todo"); // 載入 Todo model

const exphbs = require("express-handlebars"); //載入handlebars

const res = require("express/lib/response");

const methodOverride = require("method-override"); // 載入methodOverride

const routes = require("./routes");
const router = require("./routes/modules/home");

require("./config/mongoose");

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

// 設定首頁路由
app.use(routes);

// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
