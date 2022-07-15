var express = require('express');
var router = express.Router();

//test
router.get("/emohouse",require('../api/emohouse/emohouse.js'));

router.get("/getTaoLuData",require('../api/emohouse/getTaoLuData.js'));
router.get("/gettaoluDetail",require('../api/emohouse/gettaoluDetail.js'));
router.get("/getemolinks",require('../api/emohouse/getemolinks.js'));
router.get("/getEmoHouseSort",require('../api/emohouse/getEmoHouseSort.js'));
router.get("/getPublicEmoBySortId",require('../api/emohouse/getPublicEmoBySortId.js'));

router.get("/getPublicEmohouse",require('../api/emohouse/getPublicEmohouse.js'));
router.get("/getUserEmoHouseByUidEid",require('../api/emohouse/getUserEmoHouseByUidEid.js'));
router.get("/getUserEmoHouseByUid",require('../api/emohouse/getUserEmoHouseByUid.js'));

router.post("/addEmoToUserEmoHouse",require('../api/emohouse/addEmoToUserEmoHouse.js'));
router.post("/removeEmoToUserEmoHouse",require('../api/emohouse/removeEmoToUserEmoHouse.js'));
router.get("/findemohousebymd5",require('../api/emohouse/findemohousebymd5.js'));


//关注
router.post("/followuser",require('../api/emohouse/followuser.js'));
router.post("/unfollowuser",require('../api/emohouse/unfollowuser.js'));
router.get("/isfollowed",require('../api/emohouse/isfollowed.js'));
router.get("/getFollowUserList",require('../api/emohouse/getFollowUserList.js'));

//删除表情仓库
router.post("/removePublicEmoHouse",require('../api/emohouse/removePublicEmoHouse.js'));


module.exports = router;
