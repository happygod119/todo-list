const express = require("express"); // 引用 Express 與 Express 路由器

const router = express.Router(); // 準備引入路由模組

const home = require("./modules/home"); // 引入 home 模組程式碼
const todos = require("./modules/todos");
const users = require("./modules/users"); 
const auth = require('./modules/auth')   // 引用模組

const { authenticator } = require('../middleware/auth')  // 掛載 middleware

router.use('/todos', authenticator, todos) // 加入驗證程序
router.use("/users", users); 
router.use('/auth', auth)  // 掛載模組
router.use('/', authenticator, home) // 加入驗證程序

module.exports = router; // 匯出路由器
