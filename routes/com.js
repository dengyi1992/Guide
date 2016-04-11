var express = require('express');
var router = express.Router();
var upload = require('../common/upload');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('通用接口');
});
router.post('/upload', upload.uploadfile);

module.exports = router;
