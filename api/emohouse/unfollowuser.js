const {UserFollewers} = require('@/mysql/emohouse/userFollewers') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {
  let followedUserId = req.body.followedUserId;
  let emUserId = req.body.emUserId;
  //先判断是不是互关了
  let isfed = await UserFollewers.findIsFollowed(emUserId,followedUserId);
  if (isfed.length > 0){//被关注了
    //修改被关注数据的那条互粉数据
    UserFollewers.updateIshufen(isfed[0].id,0);
  }
  let data = await UserFollewers.unfollow(followedUserId, emUserId);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = addLoopImgs;
