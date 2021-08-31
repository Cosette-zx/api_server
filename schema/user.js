// 导入定义验证规则的包@hapi/joi已被弃用,Switch to 'npm install joi'
const joi = require("joi");
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();
// 定义id， nickname， email的验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const user_email = joi.string().email().required();
const avatar = joi.string().dataUri().required();

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
  // 对注册登录的表单数据的规则对象
  body: {
    username,
    password,
  },
};

// 更新用户信息的验证规则对象
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email: user_email,
  },
};

// 验证规则对象---重置密码
exports.update_password_schema = {
  // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
  // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
  // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
  oldPwd: password,
  newPwd: joi.not(joi.ref("oldPwd")).concat(password),
};

// 头像验证规则
exports.update_avatar_schema = {
  body: {
    avatar,
  },
};
