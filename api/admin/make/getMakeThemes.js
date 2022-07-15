const {MakePageThemm} = require('@/mysql/miniprogram/makePageThemm') ;// 引入数据库文件

const getMakeThemm = async (req, res, next) => {
  let data = await MakePageThemm.findAllTHeme();
  res.json(global.toJson(200, '获取成功',data))
};
module.exports = getMakeThemm;
