const { dbQuery } = require("../db/index")
const { tables, jwtSecretKey, expiresIn } = require("../config")

// 获取所有用户
const queryUsersSQL = `SELECT * FROM ${tables.user}`;


// 获取所有用户信息的处理函数
exports.getall = async (request, response) => {
	try {
		const queryRes = await dbQuery(queryUsersSQL);

		response.fastSend("获取成功！", 2000, queryRes);
	}
	catch (error) {
		response.fastSend(error.message);
	}
}
