const {GifRoomShares} = require('@/mysql/miniprogram/gifRoomShares') ;// 引入数据库文件
const {UserUnreadMessages} = require('@/mysql/miniprogram/userUnreadMessages') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  let data = req.body;
  const endData = await GifRoomShares.insertData(data.userid,data.gifroomId,data.makeUserId);
  if (endData){
    res.json(global.toJson(200, '点赞成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = addLoopImgs;
