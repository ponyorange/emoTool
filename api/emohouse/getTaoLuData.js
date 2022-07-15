const {TaoLu} = require('@/mysql/taolu/taolu') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {
  let data = await TaoLu.findAllTaolus();
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = addLoopImgs;
