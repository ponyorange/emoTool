const {ChristmasHat} = require('@/mysql/miniprogram/christmasHat') ;// 引入数据库文件

const getChristmasHat = async (req, res, next) => {
  let typeId = req.query.typeId;
  let data = await ChristmasHat.findAllHatByType(typeId);
  res.json(global.toJson(200, '获取成功',data))
};
module.exports = getChristmasHat;
