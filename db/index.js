const mysql = require("mysql2");

const { dataBase } = require("../config");

const db = mysql.createConnection(dataBase);


/**
 * @DB_QUERY 封装操作数据库的方法
 * @param {*} sql SQL语句
 * @param {*} criteria 查询参数
 * @returns 
 */
function DB_QUERY(sql, criteria) {
	return new Promise((resolve, reject) => {
		db.query(sql, criteria, (err, res) => {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
};

module.exports = { db, DB_QUERY }