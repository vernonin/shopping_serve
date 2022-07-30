// 导入 bcryptjs 对密码进行加密
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')

const { dbQuery } = require("../db/index")
const { tables, jwtSecretKey, expiresIn } = require("../config")


// 查询用户是否被占用
const getUserSQL = `SELECT * FROM ${tables.user} WHERE username = ?`
// 插入用户
const insertUserSQL = `INSERT INTO ${tables.user} SET ?`

/** 
 * 用户注册的处理函数
 */
exports.register = async (request, response) => {
	let { username, password } = request.body;

	try {
		
		let queryRes = await dbQuery(getUserSQL, username);
		if (queryRes.length > 0) {
			throw new Error("用户名已存在，请更换其他用户名！");
		}
		
		// 密码加密
		password = bcrypt.hashSync(password, 10);
		
		let inserRes = await dbQuery(insertUserSQL, { username, password });
		if (inserRes.affectedRows !== 1) {
			throw new Error("注册失败，请稍后重试！");
		}

		response.fastSend("注册成功！", 2000);
		
	}
	catch (error) {
		response.fastSend(error.message);
	}
}


/** 
 * 用户登录的处理函数
 */
exports.login = async (request, response) => {
	let { username, password } = request.body;

	try {
		let queryRes = await dbQuery(getUserSQL, username);

		if (queryRes.length !== 1) {
			throw new Error("用户不存在！");
		}

		// 验证密码
		const compareResult = bcrypt.compareSync(password, queryRes[0].password);
		if (!compareResult) {
			throw new Error("密码错误！");
		}
 
		const user = { ...queryRes[0], password: "" };
		const tokenStr = jwt.sign(user, jwtSecretKey, { expiresIn });

		response.send({
			status: 2000,
			message: "登录成功！",
			token: tokenStr,
			data: user
		});

	}
	catch (error) {
		response.fastSend(error.message);
	}

}