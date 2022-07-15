const {Basegifs} = require('@/mysql/admin/basegifs') ;// 引入数据库文件

const getLoopImgs = async (req, res, next) => {
  let data = await Basegifs.findAllImgs();
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = getLoopImgs;
