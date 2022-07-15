const {ShareEmoCommentReply} = require('@/mysql/miniprogram/shareEmoCommentReply') ;// 引入数据库文件
const deleteLoopImgs = async (req, res, next) => {
  let id = req.body.id;
  const endData = await ShareEmoCommentReply.deleteById(id);
  if (endData){
    res.json(global.toJson(200, '删除成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }

};
module.exports = deleteLoopImgs;
