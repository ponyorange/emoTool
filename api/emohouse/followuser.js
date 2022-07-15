const {UserFollewers} = require('@/mysql/emohouse/userFollewers') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {
  let followedUserId = req.body.followedUserId;
  let emUserId = req.body.emUserId;
  let ishufen = 0;
  //先判断有没有被关注
  let isfed = await UserFollewers.findIsFollowed(emUserId,followedUserId);
  if (isfed.length > 0){//被关注了
    //修改被关注数据的那条互粉数据
    ishufen = 1;
    UserFollewers.updateIshufen(isfed[0].id,ishufen);
  }
  let data = await UserFollewers.insertData(followedUserId, emUserId,ishufen);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = addLoopImgs;
