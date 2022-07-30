const express = require("express");
const userRouter = express.Router();

const { register, login } = require("../controller/user");

const expressJoi = require('@escook/express-joi');
const { reg_login_schema } = require("../schema/user");

/* 注册 */
userRouter.post("/register",expressJoi(reg_login_schema), register);

userRouter.post("/login", expressJoi(reg_login_schema), login);

module.exports = userRouter;