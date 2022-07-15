const {EmoBaseImg} = require('@/mysql/miniprogram/emoBaseImg') ;// 引入数据库文件

const getLoopImgs = async (req, res, next) => {
  let typeId = req.body.id;
  let imgs = req.body.imgs;
  console.log(imgs);
  for (var i =0; i < imgs.length; i++){
    await EmoBaseImg.insertData(imgs[i], i,1,typeId);
  }
  res.json(global.toJson(200, '新增成功'))
};
module.exports = getLoopImgs;
