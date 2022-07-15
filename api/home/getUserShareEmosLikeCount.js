const {UserShareEmoLikes} = require('@/mysql/miniprogram/userShareEmoLikes') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  let data = req.query;
  const count = await UserShareEmoLikes.getLikeCount(data.shareId);
  const like = await UserShareEmoLikes.isLike(data.userid,data.shareId);
  res.json(global.toJson(200, '获取成功',{count:count,isLike:like}));
};
module.exports = addLoopImgs;
