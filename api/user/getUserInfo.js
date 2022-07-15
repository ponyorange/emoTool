const {UserShareEmoLikes} = require('@/mysql/miniprogram/userShareEmoLikes') ;// 引入数据库文件
const {UserShareEmos} = require('@/mysql/miniprogram/userShareEmos') ;// 引入数据库文件
const {UserFollewers} = require('@/mysql/emohouse/userFollewers') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {
  let id = req.query.id;
//  获取分享数
  let shareCount = await UserShareEmos.countByUserId(id);
//  获取喜欢数
  let likeCount = await UserShareEmoLikes.countLikeByUserId(id);
//  获取被喜欢数
  let likedCount = await UserShareEmoLikes.countLikedByUserId(id);
//  获取关注数
  let followCount = await UserFollewers.countuserFollow(id);
//  获取粉丝数
  let followedCount = await UserFollewers.countuserFollowed(id);
//  返回数据
  let data = {shareCount,likeCount,likedCount,followCount,followedCount};
  res.json(global.toJson(200, '获取成功',data));
};
module.exports = addLoopImgs;
