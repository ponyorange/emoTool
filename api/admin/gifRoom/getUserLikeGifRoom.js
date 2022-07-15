const {GifRoomLikes} = require('@/mysql/miniprogram/gifRoomLikes') ;// 引入数据库文件
const getLoopImgs = async (req, res, next) => {
  let userId = req.query.userId;
  let data = await GifRoomLikes.getUserLikeEmos(userId);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = getLoopImgs;
