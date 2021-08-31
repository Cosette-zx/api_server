// 导入数据库操作模块
const bcrypt = require("bcryptjs");
const { resourceLimits } = require("worker_threads");
const db = require("../db/index");

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  // 定义SQL语句
  const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`;

  // 执行SQL语句
  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
  db.query(sql, req.user.id, (err, results) => {
    // 查询执行失败
    if (err) return res.cc(err);
    // 执行SQL语句成功但是没有查询到数据
    if (results.length !== 1) return res.cc("获取用户信息失败！");
    // TODO：将用户信息发送给客户端
    res.send({
      status: 0,
      message: "获取用户信息成功了！",
      data: results[0],
    });
  });
};

// 更新用户基本信息的处理函数
exports.updatetUserInfo = (req, res) => {
  // 定义SQL语句
  const sql = `update ev_users set ? where id=?`;
  // 执行SQL语句
  db.query(sql, [req.body, req.body.id], (err, results) => {
    // SQL执行失败
    if (err) return res.cc(err);
    // 执行SQL成功，但是影响行数不为一
    if (results.affectedRows !== 1) return res.cc("更新用户基本信息失败！");
    // TODO:
    // return res.cc("修改用户基本信息成功！", 0);
    res.send({
      status: 0,
      message: "更新用户基本信息成功！",
      data: results[0],
    });
  });
};

// 更新用户密码
exports.updatePassword = (req, res) => {
  // 根据id查询用户的信息
  let sql = `select * from ev_users where id=?`;
  // 执行SQL
  db.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err);

    // 判断指定id的用户是否存在
    if (results.length !== 1) return res.cc("用户不存在！");

    // TODO: 判断提交的旧密码是否正确
    const compareResult = bcrypt.hashSync(req.body.oldPwd, results[0].password);
    if (!compareResult) return res.cc("原密码错误！");

    // 更新密码
    const sql = `update ev_users set password=? where id=?`;

    // 新密码加密
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);

    // 执行更新密码SQL
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc("更新密码失败！");
      // TODO:
      res.cc("更新密码成功！", 0);
    });
  });
};

// 更新用户头像
exports.updateAvatar = (req, res) => {
  // res.send("avatar ok");
  const sql = "update ev_users set user_pic=? where id=?";
  // 执行SQL
  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("更新头像失败!");
    // 更新头像成功
    // TODO：
    return res.cc("更新头像成功！", 0);
  });
};
