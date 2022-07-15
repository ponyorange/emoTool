const {UserUnreadMessages} = require('@/mysql/miniprogram/userUnreadMessages') ;// 引入数据库文件
const {ShareEmoCommentReply} = require('@/mysql/miniprogram/shareEmoCommentReply') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  let data = req.body;
  let path = req.body.path;
  let title = req.body.title;
  let userid = req.body.userid;
  let emUserShareEmoCommentId = req.body.emUserShareEmoCommentId;
  let emShareEmoCommentReplyId = req.body.emShareEmoCommentReplyId;
  let emUserShareEmoId = req.body.emUserShareEmoId;
  let toUserid = req.body.toUserid;
  let type = data.type;
  let tuid = toUserid;
  if (type === 1){//如果是回复评论
    tuid = null;
  }
  const endData = await ShareEmoCommentReply.insertData(path, title,"",userid,emUserShareEmoCommentId,emShareEmoCommentReplyId,emUserShareEmoId,tuid);
  // if (data.forId !== data.userid) {
  const unReadData = await UserUnreadMessages.insertData(2,emUserShareEmoId,toUserid,userid,endData.id,emUserShareEmoCommentId);
  // }
  if (endData){
    res.json(global.toJson(200, '评论成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = addLoopImgs;
