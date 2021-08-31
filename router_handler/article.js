const db = require("../db/index");

// 发布新文章的处理函数
exports.addArticle = (req, res) => {
  // console.log(req.body);
  // console.log("-------------------");
  // console.log(req.file);
  // 判断是否上传的文件
  // fieldname是字段名
  if (!req.file || req.file.fieldname !== "cover_img")
    return res.cc("文章封面是必选参数哦！");
  // TODO:表单数据合法，继续后续操作

  // 整理要插入数据库的文章信息对象
  // 导入处理路径的path模块
  const path = require("path");
  const articleInfo = {
    // 标题、内容、状态、所属的分类ID
    ...req.body,
    // 文章封面在服务器端的存放路径：filename是文件名
    cover_img: path.join("/uploads", req.file.filename),
    // 发布时间
    pub_date: new Date(),
    // 文章作者的id
    author_id: req.user.id,
  };
  console.log(articleInfo);
  // TODO:新增
  const sql = `insert into ev_articles set ?`;
  // 执行 SQL 语句
  db.query(sql, articleInfo, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc("发布文章失败！");

    // 发布文章成功
    res.cc("发布文章成功", 0);
  });
};
