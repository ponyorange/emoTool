const {PublicEmoHouse} = require('@/mysql/emohouse/publicEmoHouse') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {
  let currentPage = req.query.currentPage;
  let type = req.query.type;
  let data = await PublicEmoHouse.adminGetUserUploadEmoHouse(currentPage,type);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = addLoopImgs;
