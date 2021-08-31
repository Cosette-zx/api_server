// 将路由处理函数抽离到这里

// 导入数据库处理模块
const db = require("../db/index");
// 数据加密
const bcrypt = require("bcryptjs");
// 导入生成token的包
const jwt = require("jsonwebtoken");
// 导入全局配置文件
const config = require("../config");

// 注册处理函数
exports.regUser = (req, res) => {
  // 获取用户信息
  const userinfo = req.body;
  // 对表单数据进行合法性校验
  // if(!userinfo.username || !userinfo.password) {
  //   return res.send({status: 1,message: '用户名或密码不符合规则！'})
  // }

  // 定义SQL语句，查看是否有重名用户
  const sqlStr = `select *from ev_users where username=?`;
  // 执行SQL语句
  db.query(sqlStr, userinfo.username, function (err, results) {
    // 执行SQL语句失败
    if (err) {
      // return res.send({status: 1 ,message: err.message})
      return res.cc(err);
    }
    // 用户名已存在
    if (results.length > 0) {
      // return res.send({status: 1 ,message: '用户名被占用，请更换其他用户名'})
      return res.cc("用户名被占用，请更换其他用户名");
    }
    // TODO: 用户名可以使用
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    // 插入新用户的sql语句
    const sql = "insert into ev_users set ?";
    db.query(
      sql,
      { username: userinfo.username, password: userinfo.password },
      (err, results) => {
        // 判断SQL是否执行成功
        // if(err) return res.send({status: 1 ,message: err.message } )
        if (err) return res.cc(err);
        // 判断影响行数是否为1：级是否插入成功
        if (results.affectedRows !== 1) {
          // return res.send({status: 1 , message: '注册用户失败，请稍后再试！'})
          return res, cc("注册用户失败，请稍后再试！");
        }
        // 注册成功
        // res.send({status: 0 ,message: '注册成功！'})
        return res.cc("注册成功", 0);
      }
    );
  });
};

// 登录处理函数
exports.logUser = (req, res) => {
  // 接收表单数据
  const userinfo = req.body;
  // 定义SQL语句
  const sql = `select * from ev_users where username=?`;
  // 执行SQL语句
  db.query(sql, userinfo.username, (err, results) => {
    // 执行SQL语句失败
    if (err) return res.cc(err);
    // 执行SQL语句成功但是没有获取到数据
    if (results.length !== 1) return res.cc("用户不存在，登录失败！");
    // TODO:其他用户登录验证:判断密码是否正确(经过bcryptjs加密的)
    // compareSync（用户提交密码，数据库存储密码）
    const compareResult = bcrypt.compareSync(
      userinfo.password,
      results[0].password
    );
    if (!compareResult) {
      return res.cc("密码输入错误，登录失败！");
    }
    // res.send('login ok')
    // TODO：登录成功，生成token字符串
    const user = { ...results[0], password: "", user_pic: "" };
    // 对用户信息加密生成token字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    });
    // console.log(tokenStr)
    // res.send()将token响应给客户端
    res.send({
      status: 0,
      message: "登录成功！",
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: "Bearer " + tokenStr,
    });
  });
};
