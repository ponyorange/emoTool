const {MakePageThemm} = require('@/mysql/miniprogram/makePageThemm') ;// 引入数据库文件

const getMakeThemm = async (req, res, next) => {
  let id = req.body.banner.id;
  await MakePageThemm.destroy({
    where: {id}
  });
  res.json(global.toJson(200, '删除成功'))
};
module.exports = getMakeThemm;
