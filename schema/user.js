/**
 *  number() 必须是数字
 *  integer() 正式
 *  string() 必须是字符串
 *  alphanum() 只能是包含 a-zA-Z0-9的字符串
 *  min(length) 最小长度
 *  max(length) 最大长度
 *  pattern(正则表达式) 必须符合正则表达式的规则
 *  required() 必须填，不能为 undefined,
 *  email() 邮箱
 */

// 导入验证规则的包
const joi = require("@hapi/joi");

// 必须为6-18位字母、数字
const regPsd = /^(?![^a-zA-Z]+$)(?!\D+$)/;

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(6).max(10).required();
const password = joi.string().pattern(regPsd).required();

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
  body: { username, password }
};