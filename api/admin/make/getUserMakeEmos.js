const {MakeBaseEmo} = require('@/mysql/miniprogram/makeBaseEmo') ;// 引入数据库文件

const getEmoBaseImgType = async (req, res, next) => {
  let currentPage = req.query.currentPage;
  let data = await MakeBaseEmo.findAllEmos(currentPage);
  res.json(global.toJson(200, '获取成功',data))
};
module.exports = getEmoBaseImgType;
