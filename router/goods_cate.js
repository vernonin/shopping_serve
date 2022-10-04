const express = require("express");
const expressJoi = require("@escook/express-joi");

const {
	goods_cate_id,
	goods_cate_add,
	goods_cate_update,
	goods_cate_batch_delete
} = require("../schema/goods_cate");

const {
	getAll,
	getSingle,
	addCate,
	updateCate,
	deleteCate,
	batchDeleteCate
} = require("../controller/goods_cate");

const goodsCateRouter = express.Router();

/* 获取所有商品分类 */
goodsCateRouter.get("/getall", getAll);

/* 获取单个商品分类 */
goodsCateRouter.get("/getsingle", expressJoi(goods_cate_id), getSingle);

/* 添加商品分类 */
goodsCateRouter.post("/add", expressJoi(goods_cate_add), addCate);

/* 修改商品分类 */
goodsCateRouter.post("/update", expressJoi(goods_cate_update), updateCate);

/* 删除单个商品分类 */
goodsCateRouter.delete("/delete",expressJoi(goods_cate_id), deleteCate);

/* 批量删除商品分类 */
goodsCateRouter.delete("/batchdelete",expressJoi(goods_cate_batch_delete), batchDeleteCate);

module.exports = goodsCateRouter;
