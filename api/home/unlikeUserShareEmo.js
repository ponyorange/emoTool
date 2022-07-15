const {UserShareEmoLikes} = require('@/mysql/miniprogram/userShareEmoLikes') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  let data = req.body;
  const endData = await UserShareEmoLikes.deleteById(data.userid,data.shareId);
  if (endData){
    res.json(global.toJson(200, '取消点赞成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = addLoopImgs;
