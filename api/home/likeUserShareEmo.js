const {UserShareEmoLikes} = require('@/mysql/miniprogram/userShareEmoLikes') ;// 引入数据库文件
const {UserUnreadMessages} = require('@/mysql/miniprogram/userUnreadMessages') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  let data = req.body;
  const endData = await UserShareEmoLikes.insertData(data.userid,data.shareId,data.makeUserId);
  if (data.makeUserId !== data.userid) {
    const unReadData = await UserUnreadMessages.insertData(1,data.shareId,data.makeUserId,data.userid,endData.id);
  }
  if (endData){
    res.json(global.toJson(200, '点赞成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = addLoopImgs;
