var express = require('express');
var router = express.Router();
var multer = require('multer');//接收图片
var upload = multer({
  dest: './uploads'
});//定义图片上传的临时目录


/* POST 上传图片 */
//文件上传
// 单域单文件上传：input[file]的 multiple != "multiple"
router.post("/upload",upload.single('file'),require('../api/utils/upload.js'));
router.post("/wxupload",upload.single('file'),require('../api/utils/wxupload.js'));
router.post("/adminUpload",upload.single('file'),require('../api/utils/adminUpload.js'));
// var cpUpload = upload.fields([{ name: 'imgs', maxCount: 5 }]);
var cpUpload = upload.fields([{ name: 'imgs' }]);
router.post('/uploads',cpUpload,require('../api/utils/uploads.js'));

module.exports = router;
