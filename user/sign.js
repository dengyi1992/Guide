/**
 * Created by deng on 16-4-11.
 * 登录，注册
 */
var validator = require('validator');
var eventproxy = require('eventproxy');
var userFind = require("../common/userFind.js");
var tools = require("../common/tools.js");
var updateUser = require("../common/updateUser.js");
var epSql = new eventproxy();
var mysql = require('mysql');
var config = require("../config.js");
var conn = mysql.createConnection(config.database_info);
exports.signup = function (req, res, next) {
    var loginname = validator.trim(req.body.loginname).toLowerCase();
    var email = validator.trim(req.body.email).toLowerCase();
    var pass = validator.trim(req.body.pass);
    var rePass = validator.trim(req.body.re_pass);

    var ep = new eventproxy();
    ep.fail(next);
    ep.on('prop_err', function (msg) {
        res.json({error: msg, loginname: loginname, email: email});
    });

    // 验证信息的正确性
    if ([loginname, pass, rePass, email].some(function (item) {
            return item === '';
        })) {
        ep.emit('prop_err', '信息不完整。');
        return;
    }
    if (loginname.length < 5) {
        ep.emit('prop_err', '用户名至少需要5个字符。');
        return;
    }
    if (!tools.validateId(loginname)) {
        return ep.emit('prop_err', '用户名不合法。');
    }
    if (!validator.isEmail(email)) {
        return ep.emit('prop_err', '邮箱不合法。');
    }
    if (pass !== rePass) {
        return ep.emit('prop_err', '两次密码输入不一致。');
    }
    // END 验证信息的正确性

    if (!(userFind.getUsersByQuery({loginname: loginname, email: email}))) {
        epSql.emit('doInsert', {name: loginname, email: email, password: pass});
        res.json({msg: 'success', content: '注册成功'});

        //插入数据库
    } else {
        return ep.emit('prop_err', '用户名或邮箱已注册');
    }

}
;
exports.login = function (req, res, next) {
    var loginname = validator.trim(req.body.name).toLowerCase();
    var pass = validator.trim(req.body.pass);
    var ep = new eventproxy();

    ep.fail(next);

    if (!loginname || !pass) {
        res.status(422);
        return res.json({msg: 'lack info', content: '信息不完整'});
    }
    // var getUser;
    // if (loginname.indexOf('@') !== -1) {
    //     getUser = userFind.getUserByMail(loginname,pass);
    // } else {
    //     getUser = userFind.getUserByLoginName(loginname,pass);
    // }
    ep.on('login_error', function (login_error) {
        res.json({msg: 'error', content: '用户名或密码错误'});
    });
    var selectUser = 'SELECT * FROM users WHERE name =? and pwd = ?';
    var selectParams = [loginname, pass];
    conn.query(selectUser, selectParams, function (err, rows, fields) {
        if (err) {
            return res.json({msg: 'error', content: '用户名或密码错误'});
        }
        if (rows.length >= 1) {
            return res.json({msg: 'success',name: loginname, content: '登录成功'});

        } else {
            ep.emit('login_error')
        }
    });


};
//提交注册信息
epSql.on('doInsert', function (userInfo) {
    updateUser.insertUser(userInfo);
});
