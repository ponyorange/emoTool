const {UserShareEmoLikes} = require('@/mysql/miniprogram/userShareEmoLikes') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  let currentPage = req.query.currentPage;
  let userid = req.query.userid;
  const data = await UserShareEmoLikes.getUserLikeEmos(userid,currentPage);
  // console.log(data);
  if (data){
    res.json(global.toJson(200, '获取成功',data))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = addLoopImgs;
