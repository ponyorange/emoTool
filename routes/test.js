var express = require('express');
var router = express.Router();

//test
// router.get("/twofaces",require('../api/test/twofaces.js'));

//爬虫
router.get("/getwxgzhEmos",require('../api/test/getwxgzhEmos.js'));

module.exports = router;
