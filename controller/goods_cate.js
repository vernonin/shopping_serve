const { DB_QUERY } = require("../db/index");
const { tables } = require("../config");

// 查询 分类名称和分类别名 是否被占用的 SQL 语句
const selectSQL = `SELECT * FROM ${tables.goodsCate} WHERE name=? OR alias=?`;
// 添加商品分类的 SQL 语句
const insertSQL = `INSERT INTO ${tables.goodsCate} SET ?`;


/* 添加商品分类的处理函数 */
exports.add = async (requset, response) => {
	try {
		const { name, alias	} = requset.body;

		// 先查找数据库是否已有存在的 name 或者 alias
		const selectResult = await DB_QUERY(selectSQL, [name, alias]);

		if (selectResult.length === 2) {
			throw Error("分类名称与分类别名已被占用！");
		}

		if (
			selectResult.length === 1 &&
			selectResult[0].name === name &&
			selectResult[0].alias === alias
		) {
			throw Error("分类名称与分类别名已被占用！");
		}

		if (selectResult.length === 1 && selectResult[0].name === name) {
			throw Error("分类名称名已被占用！");
		}

		if (selectResult.length === 1 && selectResult[0].alias === alias) {
			throw Error("分类别名名已被占用！");
		}


		// 当数据库没有找到相同时，可以插入
		const insertResult = await DB_QUERY(insertSQL, { name, alias });

		if (insertResult.affectedRows !== 1) {
			throw Error("新增文章分类失败！");
		}
		response.fastSend("新增文章分类成功！", 2000);

	}
	catch (error) {
		response.fastSend(error);
	}
}
