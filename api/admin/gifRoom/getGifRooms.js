const {GifRooms} = require('@/mysql/miniprogram/gifRooms') ;// 引入数据库文件

const getLoopImgs = async (req, res, next) => {
  let currentPage = req.query.currentPage;
  let status = req.query.status;
  let data = await GifRooms.findAllData(currentPage,status);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = getLoopImgs;
