const {GifRoomLikes} = require('@/mysql/miniprogram/gifRoomLikes') ;// 引入数据库文件
const {UserUnreadMessages} = require('@/mysql/miniprogram/userUnreadMessages') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  let data = req.body;
  let type = req.body.type;
  if (type === 1){//0点赞，1取消点赞
    const endData = await GifRoomLikes.deleteById(data.userid,data.gifroomId);
    //先查询有没有这个点赞，有则不点了
    if (endData){
      res.json(global.toJson(200, '点赞成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  } else{
    const endData = await GifRoomLikes.insertData(data.userid,data.gifroomId,data.makeUserId);
    // if (data.makeUserId !== data.userid) {
    //   const unReadData = await UserUnreadMessages.insertData(1,data.shareId,data.makeUserId,data.userid,endData.id);
    // }
    //先查询有没有这个点赞，有则不点了
    if (endData){
      res.json(global.toJson(200, '点赞成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  }

};
module.exports = addLoopImgs;
