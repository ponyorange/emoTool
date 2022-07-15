const {EmoBaseImgType} = require('@/mysql/miniprogram/emoBaseImgType') ;// 引入数据库文件

const getMakeThemm = async (req, res, next) => {
  let typeId = req.body.banner.id;
  let endData = await EmoBaseImgType.deleteType(typeId);
  if (endData){
    res.json(global.toJson(200, '获取成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = getMakeThemm;
