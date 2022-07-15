const {TaoLuImage} = require('@/mysql/taolu/taoluImage') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {
  let taoluid = req.query.tid;
  let data = await TaoLuImage.gettaoluByid(taoluid);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = addLoopImgs;
