const {ChristmasHat} = require('@/mysql/miniprogram/christmasHat') ;// 引入数据库文件

const getLoopImgs = async (req, res, next) => {
  let typeId = req.body.id;
  let imgs = req.body.imgs;
  console.log(imgs);
  for (var i =0; i < imgs.length; i++){
    await ChristmasHat.insertData(imgs[i], "圣诞帽",typeId);
  }
  res.json(global.toJson(200, '新增成功'))
};
module.exports = getLoopImgs;
