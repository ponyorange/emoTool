const {Basegifs} = require('@/mysql/admin/basegifs') ;// 引入数据库文件

const getLoopImgs = async (req, res, next) => {
  let id = req.query.id;
  let data = await Basegifs.findById(id);
  res.json(global.toJson(200, '来了老弟',data[0]))
};
module.exports = getLoopImgs;
