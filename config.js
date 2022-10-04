
const PORT = 9000; // 端口号

const jwtSecretKey = 'shopping_system ^_^'; // 生成token的字符串
const expiresIn = '10h';  // token生效时间

// 数据库配置
const dataBase = {
	host: "127.0.0.1",
	user: "root",
	password: "admin123",
	database: "shopping_db"
};

// 数据库表配置
const tables = {
	user: "ss_user",
	goodsCate: "ss_goods_cate"
};


module.exports = { PORT, tables, dataBase, jwtSecretKey, expiresIn };