const {UserFollewers} = require('@/mysql/emohouse/userFollewers') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {
  let followedUserId = req.query.followedUserId;
  let emUserId = req.query.emUserId;
  let data = await UserFollewers.findIsFollowed(followedUserId, emUserId);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = addLoopImgs;
