const {GifRooms} = require('@/mysql/miniprogram/gifRooms') ;// 引入数据库文件

const getLoopImgs = async (req, res, next) => {
  let currentPage = req.query.currentPage;
  let minId = req.query.minId;
  let userId = req.query.userId;
  let data = await GifRooms.findUserData(currentPage,minId,userId);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = getLoopImgs;
