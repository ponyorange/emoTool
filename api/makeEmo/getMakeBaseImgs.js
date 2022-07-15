const {EmoBaseImg} = require('@/mysql/miniprogram/emoBaseImg') ;// 引入数据库文件

const getLoopImgs = async (req, res, next) => {
  let data = await EmoBaseImg.findMakeBaseImgs();
  res.json(global.toJson(200, '获取成功',data))
};
module.exports = getLoopImgs;
