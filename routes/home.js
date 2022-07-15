var express = require('express');
var router = express.Router();



// /* GET users listing. */home
router.get("/loopimgs",require('../api/home/getLoopImgs.js'));

//分享表情
router.post("/shareEmos",require('../api/home/shareEmos.js'));
router.get("/getUserShareEmos",require('../api/home/getUserShareEmos.js'));
router.get("/getUserShareEmosByLike",require('../api/home/getUserShareEmosByLike.js'));
router.get("/getUserShareEmo",require('../api/home/getUserShareEmo.js'));

//评论
router.post("/commentShareEmo",require('../api/home/commentShareEmo.js'));
router.get("/getShareEmoComments",require('../api/home/getShareEmoComments.js'));
router.post("/deleteUserShareEmo",require('../api/home/deleteUserShareEmo.js'));
router.post("/deleteComment",require('../api/home/deleteComment.js'));


//回复评论
router.post("/replyShareEmoComment",require('../api/home/replyShareEmoComment.js'));
router.post("/deleteCommentReply",require('../api/home/deleteCommentReply.js'));

//点赞
router.post("/likeUserShareEmo",require('../api/home/likeUserShareEmo.js'));
router.post("/unlikeUserShareEmo",require('../api/home/unlikeUserShareEmo.js'));
router.get("/getUserShareEmosLikeCount",require('../api/home/getUserShareEmosLikeCount.js'));

//举报
router.post("/reportShareEmo",require('../api/home/reportShareEmo.js'));

//表情聊天
router.post("/chatEmo",require('../api/chatEmo/chatEmo.js'));
router.get("/getChatEmoTipText",require('../api/chatEmo/getChatEmoTipText.js'));
router.get("/getChatEmoIcon",require('../api/chatEmo/getChatEmoIcon.js'));

//搜索
router.get("/gethotSearchKewords",require('../api/home/gethotSearchKewords.js'));
router.get("/searchEmoByKeyword",require('../api/home/searchEmoByKeyword.js'));


module.exports = router;
