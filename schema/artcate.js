const { string } = require("joi");
const joi = require("joi");
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
const name = joi.string().required();
const alias = joi.string().alphanum().required();
const id = joi.number().integer().min(1).required();

// 校验规则对象--添加分类
exports.add_cate_schema = {
  body: {
    name,
    alias,
  },
};

//校验规则对象--删除分类
exports.delete_cate_schema = {
  params: {
    id,
  },
};

// 校验规则对象--获取分类
exports.get_cate_schema = {
  params: {
    id,
  },
};

// 校验规则对象--更新分类
exports.update_cate_schema = {
  body: {
    Id: id,
    name,
    alias,
  },
};
