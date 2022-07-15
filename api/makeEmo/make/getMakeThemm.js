const {MakePageThemm} = require('@/mysql/miniprogram/makePageThemm') ;// 引入数据库文件

const getMakeThemm = async (req, res, next) => {
  let status = 1;
  let data = await MakePageThemm.findByStatus(status);
  res.json(global.toJson(200, '获取成功',data[0]))
};
module.exports = getMakeThemm;
