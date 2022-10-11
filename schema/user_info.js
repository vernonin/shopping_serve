// 导入验证规则的包
const joi = require("@hapi/joi");

// 必须为6-18位字母、数字
const regPsd = /^(?![^a-zA-Z]+$)(?!\D+$)/;

const id = joi.number().required();
const ids = joi.array().required();

const role = joi.string().required();
const phone = joi.string().required();
const email = joi.string().required();
const address = joi.string().required();
const nickname = joi.string().required();
const password = joi.string().pattern(regPsd).required();
const username = joi.string().alphanum().min(5).max(20).required();


exports.user_id = {
	query: { id }
}

exports.user_batch_delete = {
	body: { ids }
}

exports.user_add = {
	body: { username, password, nickname, phone, email, address, role }
}

exports.user_update = {
	body: { id, username, nickname, phone, email, address, role }
}

exports.user_info_recharge = {
	body: { amount: joi.number().required() }
};