// 导入数据库模块
const db = require("../db/index");

// 获取文章列表数据的处理函数
exports.getArticleCates = (req, res) => {
  // res.send("cate ok!");
  // 定义SQL,查询未被删除的分类数据
  const sql = `select * from ev_article_cate where is_delete=0 order by id asc `;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    // if (results.length !== 1) return res.cc("获取文章分类列表失败！");
    // 成功
    res.send({
      status: 0,
      message: "获取文章分类列表成功！",
      data: results,
    });
  });
};

// 添加文章分类的处理函数
exports.addArticleCates = (req, res) => {
  // res.send("addcate ok");
  const sql = `select * from ev_article_cate where  name=? or alias=?`;
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err);
    if (results.length === 2) {
      return res.cc("分类名称与别名被占用，请更换后重试！");
    }
    if (
      results.length === 1 &&
      results[0].name === req.body.name &&
      results[0].alias === req.body.alias
    )
      return res.cc("分类名或分类别名被占用，请更换后重试！");
    if (results.length === 1 && results[0].name === req.body.name)
      return res.cc("分类名被占用，请更换后重试！");
    if (results.length === 1 && results[0].alias === req.body.alias)
      return res.cc("分类别名被占用，请更换后重试！");

    // TODO: 分裂别名和名称都可用，下一步新增文章分类
    // 定义插入文章分类的SQL语句
    const sql = `insert into ev_article_cate set?`;
    db.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) {
        return res.cc("新增文章分类失败！");
      }
      res.cc("新增文章分类成功！", 0);
    });
  });
};

// 定义删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
  // res.send("delete ok");
  // 定义SQL语句 删除分类的语句
  const sql = `update  ev_article_cate set is_delete=1 where id=?`;
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) {
      return res.cc("删除文章分类失败！");
    }
    // TODO
    res.cc("删除文章分类成功", 0);
  });
};

// 定义根据id获取文章分类数据的处理函数
exports.getArtCateById = (req, res) => {
  // res.send("get ok");
  const sql = "select * from ev_article_cate where id=?";
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("获取文章分类数据失败！");
    // TODU
    res.send({
      status: 0,
      message: "获取文章分类数据成功！",
      data: results[0],
    });
  });
};

//定义根据文章ID更新文章分类数据的处理函数
exports.updateCateById = (req, res) => {
  // 查询分类名和分类别名是否被占用
  const sql = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`;
  db.query(
    sql,
    [req.body.Id, req.body.name, req.body.alias],
    (err, results) => {
      if (err) return res.cc(err);
      if (results.length === 2)
        return res.cc("分类名称和别名内占用，请重新输入！");
      if (
        results.length === 1 &&
        results[0].name === req.body.name &&
        results[0].alias === req.body.alias
      )
        return res.cc("分类名或分类别名被占用，请更换后重试！");
      if (results.length === 1 && results[0].name === req.body.name)
        return res.cc("分类名被占用，请更换后重试！");
      if (results.length === 1 && results[0].alias === req.body.alias)
        return res.cc("分类别名被占用，请更换后重试！");
      // TODO:更新文章分类
      const sql = `update ev_article_cate set? where Id=?`;
      db.query(sql, [req.body, req.body.Id], (err, results) => {
        if (err) res.cc(err);
        if (results.affectedRows !== 1) return res.cc("更新文章分类信息失败！");
        // TODO
        res.cc("更新文章分类成功！", 0);
      });
    }
  );
};
