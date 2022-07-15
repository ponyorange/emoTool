var express = require('express');
var router = express.Router();



router.post("/followRecommend",require('../api/want/followRecommend.js'));
router.post("/isFollowRecommend",require('../api/want/isFollowRecommend.js'));

//评论
router.post("/commentRecommend",require('../api/want/commentRecommend.js'));
router.get("/getRecommentComments",require('../api/want/getRecommentComments.js'));
router.post("/deleteComment",require('../api/want/deleteComment.js'));
module.exports = router;
