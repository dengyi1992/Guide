var express = require('express');
var sign = require("../user/sign.js");
var query = require("../user/query.js");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup', sign.signup);  // 提交注册信息
router.post('/login', sign.login);  // 登录校验
router.get('/user/:name', query.queryUsersInfo); // 用户个人主页
module.exports = router;
