const {ChristmasHatType} = require('@/mysql/miniprogram/christmasHatType') ;// 引入数据库文件
const getMakeThemm = async (req, res, next) => {
  let typeId = req.body.banner.id;
  let endData = await ChristmasHatType.deleteType(typeId);
  if (endData){
    res.json(global.toJson(200, '获取成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = getMakeThemm;
