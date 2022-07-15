var express = require('express');
var router = express.Router();


//admin
/* gifRoom */
router.post("/addGifRoom",require('../api/admin/gifRoom/addGifRoom.js'));
router.get("/getGifRooms",require('../api/admin/gifRoom/getGifRooms.js'));
router.post("/changeGifRoomStatus",require('../api/admin/gifRoom/changeGifRoomStatus.js'));


//user
router.get("/getUserGifRooms",require('../api/admin/gifRoom/getUserGifRooms.js'));
router.get("/getUserGifRoomMark",require('../api/admin/gifRoom/getUserGifRoomMark.js'));
router.post("/markUserGifRoom",require('../api/admin/gifRoom/markUserGifRoom.js'));
router.post("/shareGifRoom",require('../api/admin/gifRoom/shareGifRoom.js'));
router.get("/getUserGifRoomShare",require('../api/admin/gifRoom/getUserGifRoomShare.js'));

router.post("/likeGifRoom",require('../api/admin/gifRoom/likeGifRoom.js'));
router.get("/getGifRoomLikeCount",require('../api/admin/gifRoom/getGifRoomLikeCount.js'));
router.get("/getUserLikeGifRoom",require('../api/admin/gifRoom/getUserLikeGifRoom.js'));
router.post("/shareGifRoomToFriend",require('../api/admin/gifRoom/shareGifRoomToFriend.js'));

router.get("/getGifRoomById",require('../api/admin/gifRoom/getGifRoomById.js'));

module.exports = router;


