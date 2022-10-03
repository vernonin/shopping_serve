const mysql = require("mysql2");

const { dataBase } = require("../config");

const db = mysql.createConnection(dataBase)


/**
 * @dbQuery 封装操作数据库的方法
 * @param {*} sql SQL语句
 * @param {*} criteria 参数
 * @returns 
 */
function dbQuery(sql, criteria) {
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

module.exports = { db, dbQuery }