const express = require("express");
const expressJoi = require("@escook/express-joi");

const {
	goods_cate_id,
	goods_cate_add,
	goods_cate_batch_delete
} = require("../schema/goods_cate")

const { addCate, getAll, deleteCate, batchDeleteCate } = require("../controller/goods_cate")

const goodsCateRouter = express.Router();

/* 获取商品分类 */
goodsCateRouter.get("/getall", getAll);

/* 添加分类 */
goodsCateRouter.post("/add", expressJoi(goods_cate_add), addCate);

/* 删除单个商品分类 */
goodsCateRouter.delete("/delete",expressJoi(goods_cate_id), deleteCate);

/* 批量删除商品分类 */
goodsCateRouter.delete("/batchdelete",expressJoi(goods_cate_batch_delete), batchDeleteCate);

module.exports = goodsCateRouter;
