const {EmoBaseImg} = require('@/mysql/miniprogram/emoBaseImg') ;// 引入数据库文件
const getMakeThemm = async (req, res, next) => {
  let typeid = req.query.typeid;
  let data = await EmoBaseImg.findMakeBaseImgsByTypeId(typeid);
  res.json(global.toJson(200, '获取成功',data))
};
module.exports = getMakeThemm;
