// 文章分类路由模块

const express = require("express");

const router = express.Router();

//导入校验数据的中间件
const expressJoi = require("@escook/express-joi");
// 导入文章分类的校验模块
const {
  add_cate_schema,
  delete_cate_schema,
  get_cate_schema,
  update_cate_schema,
} = require("../schema/artcate");

// 导入文章分类数据的处理函数
const artcate_handler = require("../router_handler/artcate");

// 获取文章的列表数据
router.get("/cates", artcate_handler.getArticleCates);

// 添加文章分类的路由
router.post(
  "/addcates",
  expressJoi(add_cate_schema),
  artcate_handler.addArticleCates
);

// 删除文章分类的路由
router.get(
  "/deletecate/:id",
  expressJoi(delete_cate_schema),
  artcate_handler.deleteCateById
);

// 根据id获取文章分类数据的路由
router.get(
  "/cates/:id",
  expressJoi(get_cate_schema),
  artcate_handler.getArtCateById
);

//定义更新文章分类的路由
router.post(
  "/updatecate",
  expressJoi(update_cate_schema),
  artcate_handler.updateCateById
);

module.exports = router;
