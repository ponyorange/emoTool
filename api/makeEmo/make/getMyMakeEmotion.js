const {MakeBaseEmo} = require('@/mysql/miniprogram/makeBaseEmo') ;// 引入数据库文件

const getEmoBaseImgType = async (req, res, next) => {
  let userId = req.query.id;
  let data = await MakeBaseEmo.findTopByUserId(userId);
  // console.log(data);

  res.json(global.toJson(200, '获取成功',data))
};
module.exports = getEmoBaseImgType;
