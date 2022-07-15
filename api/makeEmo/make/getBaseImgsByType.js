const {EmoBaseImg} = require('@/mysql/miniprogram/emoBaseImg') ;// 引入数据库文件

const getBaseImgsByTypeId = async (req, res, next) => {
  let typeId = req.query.typeId;
  let data = await EmoBaseImg.findMakeBaseImgsByTypeId(typeId);
  res.json(global.toJson(200, '获取成功',data))
};
module.exports = getBaseImgsByTypeId;
