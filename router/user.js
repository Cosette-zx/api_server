const express = require("express");
const router = express.Router();
// 导入路由处理函数模块
const userHandler = require("../router_handler/user");

// 1.导入验证数据的中间件
const expressJoi = require("@escook/express-joi");
// 2.导入需要的验证规则对象:结构赋值
const { reg_login_schema } = require("../schema/user");

// 注册新用户
router.post("/register", expressJoi(reg_login_schema), userHandler.regUser);

// 登录
router.post("/login", expressJoi(reg_login_schema), userHandler.logUser);

// 模块化暴露模块：将路由对象共享出去
module.exports = router;
