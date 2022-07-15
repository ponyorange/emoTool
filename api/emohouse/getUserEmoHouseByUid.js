const {UserEmoHouse} = require('@/mysql/emohouse/userEmoHouse') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {
  let uid = req.query.uid;
  let currentPage = req.query.currentPage;
  let data = await UserEmoHouse.findByUid(currentPage,uid);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = addLoopImgs;
