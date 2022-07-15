const {EmoBaseImg} = require('@/mysql/miniprogram/emoBaseImg') ;// 引入数据库文件

const getLoopImgs = async (req, res, next) => {
  // let data = await EmoBaseImg.findMakeBaseImgs();
  console.log(req.body);
  let imgs = req.body;
  for (var i =0; i < imgs.length; i++){
    imgs[i].position = i + 1;
    await EmoBaseImg.updateMakeBaseImgs(imgs[i]);
  }
  console.log(imgs);
  res.json(global.toJson(200, '更新成功'))
};
module.exports = getLoopImgs;
