const express = require("express");
const userInfoRouter = express.Router();
const expressJoi = require("@escook/express-joi");

const {
	user_id,
	user_batch_delete,
	user_info_recharge
} = require("../schema/user_info");

const {
	getall,
	getUser,
	deleteUser,
	batchDelete,
	updateAvatar,
	recharge
} = require("../controller/user_info");

/** 查询当前用户的信息 */
 userInfoRouter.get("/getuser", getUser);

/* 查询所有用户 */
userInfoRouter.get("/getall", getall);

/* 删除单个用户 */
userInfoRouter.delete("/delete",expressJoi(user_id), deleteUser);

/* 批量删除用户 */
userInfoRouter.delete("/batchdelete",expressJoi(user_batch_delete), batchDelete)

/* 更新头像 */
userInfoRouter.post("/avatar", updateAvatar);

/* 充值钱包 */
userInfoRouter.post("/recharge", expressJoi(user_info_recharge), recharge);

module.exports = userInfoRouter;
