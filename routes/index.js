var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
//上传
var upload = require('../common/upload');
router.post('/upload', upload.uploadfile);

module.exports = router;
