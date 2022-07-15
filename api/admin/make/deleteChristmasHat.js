const {ChristmasHat} = require('@/mysql/miniprogram/christmasHat') ;// 引入数据库文件

const getMakeThemm = async (req, res, next) => {
  let id = req.body.id;
  await ChristmasHat.destroy({
    where: {id}
  });
  res.json(global.toJson(200, '删除成功'))
};
module.exports = getMakeThemm;
