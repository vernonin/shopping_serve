// 导入验证规则的包
const joi = require("@hapi/joi")

exports.user_info_recharge = {
	body: { amount: joi.number().required() }
}