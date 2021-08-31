const express = require("express");
const app = new express();

// 导入cors中间件实现跨域
const cors = require("cors");

// 验证规则对象的包
const joi = require("@hapi/joi");

// 将cors注册为全局中间件
app.use(cors());
// 配置解析表单数据的中间件:只能解析application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extend: false }));

// 托管静态资源文件
app.use("/uploads", express.static("./uploads"));

// 优化res.send()的中间件创建res.cc()
app.use(function (req, res, next) {
  // status = 0 成功；status = 1 失败，默认为1，为了方便处理失败的情况
  // err的值可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// 路由配置之前配置解析token的中间件
// 导入配置文件
const config = require("./config");
// 解析 token 的中间件
const expressJWT = require("express-jwt");
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] })
);

// 导入使用路由模块
const userRouter = require("./router/user");
app.use("/api", userRouter);
//导入使用用户信息模块
const userinfoRouter = require("./router/userinfo");
app.use("/my", userinfoRouter);
// 导入并使用文章分类路由模块
const artCateRouter = require("./router/artcate");
app.use("/my/article", artCateRouter);
// 导入并使用文章路由模块
const articleRouter = require("./router/article");
// 为文章的路由挂载统一的访问前缀 /my/article
app.use("/my/article", articleRouter);

// 定义全局错误级别中间件(引用Joi)
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err);
  // 身份认证失败后的错误
  if (err.name === "UnauthorizedError") return res.cc(err);
  // 未知错误
  res.cc(err);
});

// 启动服务器
app.listen(3007, (err) => {
  if (!err) {
    console.log("api server running at http://127.0.0.1:3007");
  }
});
