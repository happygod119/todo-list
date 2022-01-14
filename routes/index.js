const express = require("express"); // 引用 Express 與 Express 路由器

const router = express.Router() // 準備引入路由模組

const home = require('./modules/home') // 引入 home 模組程式碼
const todos = require('./modules/todos')

router.use('/', home)
router.use('/todos', todos)

module.exports = router // 匯出路由器