var express = require('express');
var upload =require('../common/upload');
var router = express.Router();
/**
 * post上传文件必须
 */
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/upload',upload.upload);
router.post('/uploadfile',multipartMiddleware,upload.uploadfile);

module.exports = router;
