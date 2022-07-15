const {PublicEmoHouse} = require('@/mysql/emohouse/publicEmoHouse') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {
  let currentPage = req.query.currentPage;
  let sid = req.query.sid;
  let data = await PublicEmoHouse.findBySortsIdPage(currentPage,sid);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = addLoopImgs;
