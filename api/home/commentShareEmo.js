const {UserShareEmoComments} = require('@/mysql/miniprogram/userShareEmoComments') ;// 引入数据库文件
const {UserUnreadMessages} = require('@/mysql/miniprogram/userUnreadMessages') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  let data = req.body;
  const endData = await UserShareEmoComments.insertData(data.img, data.title,data.des,data.userid,data.shareId);
  if (data.forId !== data.userid) {
    const unReadData = await UserUnreadMessages.insertData(0,data.shareId,data.forId,data.userid,endData.id,endData.id);
  }
  if (endData){
    res.json(global.toJson(200, '评论成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = addLoopImgs;
