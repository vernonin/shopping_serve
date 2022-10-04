const { DB_QUERY } = require("../db/index");
const { tables } = require("../config");


// 查询未被删除单个商品分类的 SQL 语句
const selectSingleSQL = `SELECT id, name, alias, status FROM ${tables.goodsCate} WHERE id=? AND is_delete=0`;
// 查询未被删除所有商品分类的 SQL 语句
const selectAllSQL = `SELECT id, name, alias, status FROM ${tables.goodsCate} WHERE is_delete=0`;
// 查询 分类名称和分类别名 是否被占用的 SQL 语句
const selectSQL = `SELECT * FROM ${tables.goodsCate} WHERE name=? OR alias=?`;
// 添加商品分类的 SQL 语句
const insertSQL = `INSERT INTO ${tables.goodsCate} SET ?`;
// 删除商品分类的 SQL 语句
const deleteSQL = `UPDATE ${tables.goodsCate} SET is_delete=1 WHERE id=?`;
// 批量删除商品分类的 SQL 语句
const batchdeleteSQL = `UPDATE ${tables.goodsCate} SET is_delete=1 WHERE FIND_IN_SET (id, ?)`;
// 查询别名是否别占用的 SQL 语句
const querySQL = `SELECT * FROM ${tables.goodsCate} WHERE id<>? AND (name=? OR alias=?)`;
// 修改商品分类的 SQL 语句
const updateSQL = `UPDATE ${tables.goodsCate} SET ? WhERE id=?`;

/* 获取所有商品分类的处理函数 */
exports.getAll = async (_, response) => {
	try {
		const selectResult = await DB_QUERY(selectAllSQL);

		response.fastSend("获取成功！", 2000, selectResult);
	}
	catch (error) {
		response.fastSend(error)
	}
}

/* 获取单个商品分类的处理函数 */
exports.getSingle = async (request, response) => {
	try {
		const { id } = request.query;

		const selectResult = await DB_QUERY(selectSingleSQL, id);

		response.fastSend("获取成功！", 2000, selectResult);
	}
	catch (error) {
		response.fastSend(error);
	}
}

/* 添加商品分类的处理函数 */
exports.addCate = async (request, response) => {
	try {
		const { name, alias	} = request.body;

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

/* 修改商品分类的处理函数 */
exports.updateCate = async (request, response) => {
	try {
		const { id, name, alias } = request.body;

		const queryResult = await DB_QUERY(querySQL, [id, name, alias]);

		if (queryResult.length === 2) {
			throw Error("分类名称与分类别名已被占用，请更换后重试！");
		}

		if (
			queryResult.length === 1 &&
			queryResult[0].name === name &&
			queryResult[0].alias === alias
		) {
			throw Error("分类名称与分类别名已被占用，请更换后重试！");
		}

		if (queryResult.length === 1 && queryResult[0].name === name) {
			throw Error("分类名称已被占用，请更换后重试！");
		}

		if (queryResult.length === 1 && queryResult[0].alias === alias) {
			throw Error("分类别名已被占用，请更换后重试！");
		}


		const updateResult = await DB_QUERY(updateSQL, [request.body, id]);

		if (updateResult.affectedRows !== 1) {
			throw Error("更新商品分类失败！");
		}
		
		response.fastSend("更新商品分类成功！", 2000);
	}
	catch (error) {
		response.fastSend(error);
	}
}

/* 删除单个商品分类的处理函数 */
exports.deleteCate = async (request, response) => {
	try {
		const { id } = request.query;

		const deleteResult = await DB_QUERY(deleteSQL, id);

		if (deleteResult.affectedRows !== 1) {
			throw Error("删除商品分类失败！");
		}
		response.fastSend("删除商品分类成功！", 2000);

	}
	catch (error) {
		response.fastSend(error);
	}
}

/* 批量删除商品分类的处理函数 */
exports.batchDeleteCate = async (request, response) => {
	try {
		const { ids } = request.body;

		const idsStr = ids.join();

		const result = await DB_QUERY(batchdeleteSQL, idsStr);

		if (result.affectedRows !== ids.length) {
			throw Error("删除商品分类失败！");
		}

		response.fastSend("删除商品分类成功！", 2000);
	}
	catch (error) {
		response.fastSend(error);
	}
}
