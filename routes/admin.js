var express = require('express');
var router = express.Router();


//admin
/* 登录 */
router.post("/login",require('../api/admin/login.js'));
router.post("/logout",require('../api/admin/logout.js'));

/* 用户管理 */
router.get("/getAllUsers",require('../api/admin/user/getAllUsers.js'));
router.get("/getAllSendUsers",require('../api/admin/user/getAllSendUsers.js'));
router.post("/addSystemUser",require('../api/admin/user/addSystemUser.js'));
router.post("/removeUser",require('../api/admin/user/removeUser.js'));

//轮播图
router.post("/addloopimg",require('../api/admin/loopimgs/addloopimg.js'));
router.post("/deleteloopimg",require('../api/admin/loopimgs/deleteloopimg.js'));

/* 制作页面主题 */
router.get("/getMakeTheem",require('../api/admin/make/getMakeThemes.js'));
router.post("/updateMakeTheem",require('../api/admin/make/updateMakeTheme.js'));
router.post("/changeMakeTheem",require('../api/admin/make/changeMakeTheme.js'));
router.post("/deleteMakeTheem",require('../api/admin/make/deleteMakeTheme.js'));

//每日精选
router.post("/addrecommend",require('../api/admin/recommend/addRecommend.js'));
router.get("/getNowRecommend",require('../api/admin/recommend/getNowRecommend.js'));
router.get("/getAllRecommend",require('../api/admin/recommend/getAllRecommend.js'));


//更多图片
router.get("/getMoreEmoImgType",require('../api/admin/make/getMoreEmoImgType.js'));
router.get("/getMoreImgByType",require('../api/admin/make/getMoreImgByType.js'));
router.post("/addMoreEmoImgType",require('../api/admin/make/addMoreEmoImgType.js'));
router.post("/deleteEmoType",require('../api/admin/make/deleteEmoType.js'));

router.post("/addMoreEmoImgs",require('../api/admin/make/addMoreEmoImgs.js'));
router.post("/deleteBaseEmoImg",require('../api/admin/make/deleteBaseEmoImg.js'));

//圣诞帽
router.post("/addChristmasHatType",require('../api/admin/make/addChristmasHatType.js'));
router.post("/deleteChristmasHatType",require('../api/admin/make/deleteChristmasHatType.js'));
router.post("/addChristmasHat",require('../api/admin/make/addChristmasHat.js'));
router.post("/deleteChristmasHat",require('../api/admin/make/deleteChristmasHat.js'));

//表情分享
router.get("/getAllShareEmos",require('../api/admin/userShareEmo/getAllShareEmos.js'));

//gif管理
router.post("/addGifImgInfo",require('../api/admin/gif/addGifImgInfo.js'));
router.get("/getGifImgsList",require('../api/admin/gif/getGifImgsList.js'));
router.post("/deleteGifImgInfo",require('../api/admin/gif/deleteGifImgInfo.js'));

//表情制作
router.get("/getUserMakeEmos",require('../api/admin/make/getUserMakeEmos.js'));

//数据统计
router.get("/countDayDataByMonth",require('../api/admin/make/countDayDataByMonth.js'));

//表情仓库
router.get("/adminGetUserUploadEmoHouse",require('../api/admin/emohouse/adminGetUserUploadEmoHouse.js'));

module.exports = router;
