const joi = require("@hapi/joi");

const name = joi.string().required()
const alias = joi.string().alphanum().min(2).max(12).required();

exports.goods_cate_add = {
	body: { name, alias }
}