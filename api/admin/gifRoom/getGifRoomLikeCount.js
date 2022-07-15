const {GifRoomLikes} = require('@/mysql/miniprogram/gifRoomLikes') ;// 引入数据库文件
const {GifRoomShares} = require('@/mysql/miniprogram/gifRoomShares') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {
  let data = req.query;
  const count = await GifRoomLikes.getLikeCount(data.shareId);
  const shareCount = await GifRoomShares.getLikeCount(data.shareId);
  const like = await GifRoomLikes.isLike(data.userId,data.shareId);

  res.json(global.toJson(200, '获取成功',{count:count,isLike:like,shareCount:shareCount}));
};
module.exports = addLoopImgs;
