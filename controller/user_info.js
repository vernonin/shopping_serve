const { DB_QUERY } = require("../db/index");
const { tables, jwtSecretKey, expiresIn } = require("../config");

// 获取当前用户
const queryUserSQL = `SELECT * FROM ${tables.user} WHERE id=?`;
// 获取所有用户
const queryUsersSQL = `SELECT * FROM ${tables.user}`;
// 删除单个用户
const deleteUserSQL = `DELETE FROM ${tables.user} WHERE id=?`;
// 批量删除用户
const batchdeleteSQL = `DELETE FROM ${tables.user} WHERE FIND_IN_SET (id, ?)`;
// 充值
const rechargeSQL = `UPDATE ${tables.user} SET wallet=? WHERE id=?`;


/* 查询当前的用户信息的处理函数 */
exports.getUser = async (request, response) => {
	try {
		const { id } = request.user;

		const queryRes = await DB_QUERY(queryUserSQL, id);

		if (queryRes.length !== 1) {
			throw Error('用户不存在！');
		}

		response.fastSend('获取成功！', 2000, {
			...queryRes[0],
			password: ""
		})
	}
	catch (error) {
		response.fastSend(error);
	}
}

/* 获取所有用户信息的处理函数 */
exports.getall = async (request, response) => {
	try {
		const queryRes = await DB_QUERY(queryUsersSQL);

		const users = queryRes.map(user => {
			user.password = "";
			return user;
		})

		response.fastSend("获取成功！", 2000, users);
	}
	catch (error) {
		response.fastSend(error.message);
	}
}

/* 删除单个用户处理函数 */
exports.deleteUser = async (request, response) => {
	try {
		const { id } = request.query;
		const deleteResult = await DB_QUERY(deleteUserSQL, id);

		if (deleteResult.affectedRows !== 1) {
			throw Error("删除失败！");
		}

		response.fastSend("删除成功！", 2000);
	}
	catch (error) {
		response.fastSend(error)
	}
}

/* 批量删除用户的处理函数 */
exports.batchDelete = async (request, response) => {
	try {
		const { ids } = request.body;
		const idsStr = ids.join();

		const deleteResult = await DB_QUERY(batchdeleteSQL, idsStr);

		if (deleteResult.affectedRows !== ids.length) {
			throw Error("删除商品分类失败！");
		}

		response.fastSend("删除商品分类成功！", 2000);
	}
	catch (error) {
		response.fastSend(error)
	}
}

/* 更新头像的处理函数 */
exports.updateAvatar = async (request, response) => {
	console.log(request.fields)
	console.log((request.file))
	response.send(request.fields)
}

/* 充值钱包的处理函数 */
exports.recharge = async (request, response) => {
	try {
		const { id } = request.user;
		const { amount } = request.body;

		const queryRes = await DB_QUERY(rechargeSQL, [amount, id])

		if (queryRes.affectedRows !== 1) {
			return response.fastSend("充值失败！");
		}

		response.fastSend("充值成功", 2000);

	}
	catch (error) {
		response.fastSend(error);
	}
}
