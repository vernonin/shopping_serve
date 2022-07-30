const express = require("express");
const userInfoRouter = express.Router();

const { getall } = require("../controller/user_info");

/**
 * 获取所有用户
 */
userInfoRouter.get("/getall", getall)


module.exports = userInfoRouter;