const joi = require("@hapi/joi");

const id = joi.number().required();
const ids = joi.array().required();
const name = joi.string().required();
const status = joi.required()
const alias = joi.string().alphanum().min(2).max(12).required();

exports.goods_cate_id = {
	query: { id }
}

exports.goods_cate_add = {
	body: { name, alias, status }
}

exports.goods_cate_update = {
	body: { id, name, alias, status }
}

exports.goods_cate_batch_delete = {
	body: { ids }
}