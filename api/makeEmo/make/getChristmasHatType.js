const {ChristmasHatType} = require('@/mysql/miniprogram/christmasHatType') ;// 引入数据库文件

const getChristmasHatType = async (req, res, next) => {
  let data = await ChristmasHatType.findAllType();
  res.json(global.toJson(200, '获取成功',data))
};
module.exports = getChristmasHatType;
