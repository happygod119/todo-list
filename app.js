// 載入 express 並建構應用程式伺服器
const express = require("express");
const exphbs = require("express-handlebars"); //載入handlebars
const bodyParser = require("body-parser"); // 引用 body-parser
const methodOverride = require("method-override"); // 載入methodOverride


const routes = require("./routes");
require("./config/mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(methodOverride("_method"));

// 設定首頁路由
app.use(routes);

// 設定 
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
