const {PublicEmoHouse} = require('@/mysql/emohouse/publicEmoHouse') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {
  let emoid = req.query.emoid;
  let currentPage = req.query.currentPage;
  let data = await PublicEmoHouse.getemolinks(emoid,currentPage);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = addLoopImgs;
