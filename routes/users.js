var express = require('express');
var router = express.Router();



/* GET users listing. */
router.post("/login",require('../api/user/login.js'));
router.post("/updatewxinfo",require('../api/user/updateWXInfo.js'));
router.post("/changeUserInfo",require('../api/user/changeUserInfo.js'));
router.post("/updateUserSign",require('../api/user/updateUserSign.js'));

router.get("/getUserInfo",require('../api/user/getUserInfo.js'));
router.get("/getUserInfoByUserid",require('../api/user/getUserInfoByUserid.js'));

router.get("/getUserShareEmos",require('../api/user/getUserShareEmos.js'));
router.get("/getUserLikeShareEmos",require('../api/user/getUserLikeShareEmos.js'));
router.get("/getUnreadMsgs",require('../api/user/getUnreadMsgs.js'));
router.get("/getHistoryMsgs",require('../api/user/getHistoryMsgs.js'));
router.get("/readAllMessage",require('../api/user/readAllMessage.js'));

//积分
router.get("/getUserScroe",require('../api/sign/getUserScroe.js'));
router.get("/isSigned",require('../api/sign/isSigned.js'));
router.post("/changeUserScroe",require('../api/sign/changeUserScroe.js'));
router.post("/daySign",require('../api/sign/daySign.js'));
router.get("/getTodayScroe",require('../api/sign/getTodayScroe.js'));
router.get("/getDayTaskStatus",require('../api/sign/getDayTaskStatus.js'));
router.post("/finishTaskByType",require('../api/sign/finishTaskByType.js'));
//观看视频获得积分
router.post("/watchVideoAd",require('../api/sign/watchVideoAd.js'));

//分享
router.get("/getUserShareQRCode",require('../api/sign/getUserShareQRCode.js'));
router.get("/getQQUserShareQRCode",require('../api/sign/getQQUserShareQRCode.js'));

router.get("/getYaoQingShareInfo",require('../api/sign/getYaoQingShareInfo.js'));
router.get("/getInviteCountByUserid",require('../api/sign/getInviteCountByUserid.js'));



module.exports = router;
