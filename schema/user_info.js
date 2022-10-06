// 导入验证规则的包
const joi = require("@hapi/joi");

const id = joi.number().required();
const ids = joi.array().required();

exports.user_id = {
	query: { id }
}

exports.user_batch_delete = {
	body: { ids }
}

exports.user_info_recharge = {
	body: { amount: joi.number().required() }
};