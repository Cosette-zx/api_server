const express = require("express");
const router = express.Router();
// 导入路由处理函数模块
const userinfo_handler = require("../router_handler/userinfo");

// joi验证中间件
const expressJoi = require("@escook/express-joi");
// 导入更新数据的验证模块对象
// 导入重置密码的验证模块对象
const {
  update_userinfo_schema,
  update_password_schema,
  update_avatar_schema,
} = require("../schema/user");

// 获取用户基本信息
router.get("/userinfo", userinfo_handler.getUserInfo);

// 更新用户基本信息
router.post(
  "/userinfo",
  expressJoi(update_userinfo_schema),
  userinfo_handler.updatetUserInfo
);

// 更新用户密码的路由
router.post(
  "/updatepwd",
  expressJoi(update_password_schema),
  userinfo_handler.updatePassword
);

// 更换头像的路由
router.post(
  "/update/avatar",
  expressJoi(update_avatar_schema),
  userinfo_handler.updateAvatar
);
module.exports = router;
