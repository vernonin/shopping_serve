// 导入 bcryptjs 对密码进行加密
const bcrypt = require('bcryptjs');

const { DB_QUERY } = require("../db/index");
const { tables } = require("../config");

// 插入用户
const insertUserSQL = `INSERT INTO ${tables.user} SET ?`;
// 修改用户
const updateUserSQL = `UPDATE ${tables.user} SET ? WHERE id=?`;
// 查询用户
const getUserSQL = `SELECT * FROM ${tables.user} WHERE username = ?`;

// 获取当前用户
const queryUserSQL = `SELECT * FROM ${tables.user} WHERE id=?`;
// 获取所有用户
const queryUsersSQL = `SELECT * FROM ${tables.user} WHERE username LIKE ?`;
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
			throw new Error('用户不存在！');
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
		const { search } = request.query;
		const keyWord = search ? `%${search}%` : `%%`;

		const queryRes = await DB_QUERY(queryUsersSQL, keyWord);

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

/* 添加用户的处理函数 */
exports.addUser = async (request, response) => {
	try {
		let { username, password } = request.body;

		const queryRes = await DB_QUERY(getUserSQL, username);

		if (queryRes.length > 0) {
			throw new Error("用户名已存在，请更换其他用户名！");
		}

		// 密码加密
		password = bcrypt.hashSync(password, 10);

		const insertResult = await DB_QUERY(insertUserSQL, {...request.body, password});

		if (insertResult.affectedRows !== 1) {
			throw new Error("增加失败！");
		}

		response.fastSend("增加成功！", 2000);
	}
	catch (error) {
		response.fastSend(error)
	}
}

/* 修改用户信息的处理函数 */
exports.updateUser = async (request, response) => {
	try {
		let { id, username } = request.body;

		const queryRes = await DB_QUERY(getUserSQL, username);

		if (queryRes.length > 1) {
			throw new Error("用户名已存在，请更换其他用户名！");
		}

		// 密码加密
		// password = bcrypt.hashSync(password, 10);

		// const updateResult = await DB_QUERY(updateUserSQL, [{...request.body, password}, id]);
		const updateResult = await DB_QUERY(updateUserSQL, [{...request.body}, id]);

		if (updateResult.affectedRows !== 1) {
			throw new Error("更新用户信息失败！");
		}
		
		response.fastSend("更新用户信息成功！", 2000);
	}
	catch (error) {
		response.fastSend(error)
	}
}

/* 删除单个用户处理函数 */
exports.deleteUser = async (request, response) => {
	try {
		const { id } = request.query;
		const deleteResult = await DB_QUERY(deleteUserSQL, id);

		if (deleteResult.affectedRows !== 1) {
			throw new Error("删除失败！");
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
			throw new Error("删除商品分类失败！");
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
