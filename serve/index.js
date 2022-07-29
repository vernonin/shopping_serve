const express = require("express");

const APP = express();

APP.get('/', (req, res) => res.send('欢迎使用！'))

module.exports = APP;
