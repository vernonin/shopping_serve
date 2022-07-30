const mysql = require("mysql2");

const { dataBase } = require("../config");

const db = mysql.createConnection(dataBase)

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