var querystring = require('querystring');
var util = require('util');
var mysql = require('mysql');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var config = require('../config.js');
var conn = mysql.createConnection(config.database_info);
conn.connect();

exports.upload = function (req, res, next) {
    /* 上传页面 */
    res.sendFile(config.upload.path_uploadpage + "upload.html");


};

exports.uploadfile = function (req, res, next) {
    console.log(req.body, req.files);
    var des_file = config.upload.path + req.files.userPhoto.originalFilename
    fs.readFile(req.files.userPhoto.path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            var response;
            if (err) {
                console.log(err);
                res.end(JSON.stringify(err));

            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: config.url+config.upload.url + req.files.userPhoto.originalFilename
                };
                console.log(response);
                res.end(JSON.stringify(response));

            }
        });
    });

};