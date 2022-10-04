const express = require("express");
const expressJoi = require("@escook/express-joi");

const {
	goods_cate_add
} = require("../schema/goods_cate")

const { add } = require("../controller/goods_cate")

const goodsCateRouter = express.Router();

/* 添加分类 */
goodsCateRouter.post("/add", expressJoi(goods_cate_add), add)

module.exports = goodsCateRouter;
