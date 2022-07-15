const {GifRooms} = require('@/mysql/miniprogram/gifRooms') ;// 引入数据库文件

const getLoopImgs = async (req, res, next) => {
  let gifRoomId = req.query.gifRoomId;
  let data = await GifRooms.findById(gifRoomId);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = getLoopImgs;
