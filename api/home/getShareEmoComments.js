const {UserShareEmoComments} = require('@/mysql/miniprogram/userShareEmoComments') ;// 引入数据库文件
const {ShareEmoCommentReply} = require('@/mysql/miniprogram/shareEmoCommentReply') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  let id = req.query.id;
  let currentPage = req.query.currentPage;
  const data = await UserShareEmoComments.getNowRecommend(id,currentPage);
  for (var i = 0; i < data.rows.length; i++){
    let replys = await ShareEmoCommentReply.getReplyByCommentId(data.rows[i].id);
    // console.log(replys);
    data.rows[i].dataValues.replys = replys;
  }
  if (data){
    res.json(global.toJson(200, '获取成功',data))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = addLoopImgs;
