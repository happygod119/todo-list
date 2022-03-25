const express = require("express"); // 引用 Express 與 Express 路由器

const router = express.Router(); // 準備引入路由模組

const Todo = require("../../models/todo");

router.get("/", (req, res) => {
  const userId = req.user._id; // 變數設定
  Todo.find({ userId }) // 加入查詢條件
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ name: "asc" }) //排序 asc-正序 & desc-反序
    .then((todos) => res.render("index", { todos })) // 將資料傳給 index 樣板
    .catch((error) => console.error(error)); // 錯誤處理
});

module.exports = router;
