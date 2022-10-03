const express = require("express");
// 导入验证规则的包
const joi = require('@hapi/joi');
// 将 token 解析成用户信息
const expressJWT = require('express-jwt')

const config = require('../config')

const APP = express();

APP.use(express.urlencoded({ extended: false }));
APP.use(express.json());


// 一定要在路由之前，封装 _sender 中间件
APP.use((req, res, next) => {
  res.fastSend = (msg, status = 4000, data = {}) => {
    res.send({ status, message: msg instanceof Error ? msg.message : msg, data });
  }

  next()
})

// 一定在路由之前配置解析 token 的中间件
APP.use(expressJWT({
  secret: config.jwtSecretKey,
  algorithms: ['HS256']
}).unless({path: [/^\/exemption/]}))


/**
 * 导入路由：
 *  userRouter：登录注册路由
 */
const userRouter = require("../router/user");
const userInfoRouter = require("../router/user_info");



/**
 * 注册路由
 */

APP.use("/exemption", userRouter);
APP.use("/user", userInfoRouter)


// 在路由之后，定义错误级别的中间件
APP.use((err, req, res, next) => {
  // 验证失败导致的错误
  if(err instanceof joi.ValidationError) return res.fastSend(err);
  // token无效的错误
  if(err.name === 'UnauthorizedError') return res.fastSend("非法请求！");
  // 未知的错误
  res.fastSend(err)
});

  
module.exports = APP;
