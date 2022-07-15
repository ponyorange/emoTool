var express = require('express');
var router = express.Router();


//makeEmo
/* 获取制作表情首页基本图片 */
router.get("/getMakeBaseImgs",require('../api/makeEmo/getMakeBaseImgs.js'));
router.post("/updateMakeBaseImgs",require('../api/makeEmo/updateMakeBaseImgs.js'));
router.post("/deleteMakeBaseImg",require('../api/makeEmo/deleteMakeBaseImg.js'));

/* 制作静态表情 */
router.post("/makeBaseEmo",require('../api/makeEmo/makeBaseEmo.js'));
router.post("/qqmakeBaseEmo",require('../api/makeEmo/qqmakeBaseEmo.js'));
router.post("/makeTextEmo",require('../api/makeEmo/make/makeTextEmo.js'));
router.post("/imgToGif",require('../api/makeEmo/make/imageToEmo.js'));
router.post("/imgsToGif",require('../api/makeEmo/make/imagesToEmo.js'));
router.get("/getEmoBaseImgType",require('../api/makeEmo/make/getBaseImgType.js'));
router.get("/getEmoBaseImgByType",require('../api/makeEmo/make/getBaseImgsByType.js'));

/* 制作圣诞帽 */
router.get("/getChristmasHat",require('../api/makeEmo/make/getChristmasHat.js'));
router.get("/getChristmasHatType",require('../api/makeEmo/make/getChristmasHatType.js'));
router.post("/userAddSDCap",require('../api/makeEmo/make/userAddSDCap.js'));
router.post("/userIconAddFlag",require('../api/makeEmo/make/userIconAddFlag.js'));

/* 获取主题*/
router.get("/getMakeTheem",require('../api/makeEmo/make/getMakeThemm.js'));

/* 获取自己制作的表情 */
router.get("/getMyMakeEmotion",require('../api/makeEmo/make/getMyMakeEmotion.js'));

/* 制作GIF图 */
router.post("/makegif",require('../api/makeEmo/makegif/makegif.js'));
router.post("/qqmakegif",require('../api/makeEmo/makegif/qqmakegif.js'));
router.post("/makegifemo",require('../api/makeEmo/makegif/makeGifEmo.js'));
router.get("/getGifDetail",require('../api/makeEmo/makegif/getGifDetail.js'));
//gif加字
router.post("/gifAddText",require('../api/makeEmo/makegif/gifAddText.js'));
router.post("/qqgifAddText",require('../api/makeEmo/makegif/qqgifAddText.js'));

module.exports = router;
