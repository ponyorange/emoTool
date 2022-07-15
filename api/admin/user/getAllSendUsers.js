const {RecommendSendUsers} = require('@/mysql/admin/recommendSendUsers') ;// 引入数据库文件
const getLoopImgs = async (req, res, next) => {
  let currentPage = req.query.currentPage;
  let data = await RecommendSendUsers.findAllData(currentPage);
  res.json(global.toJson(200, '获取成功',data))
};
module.exports = getLoopImgs;
