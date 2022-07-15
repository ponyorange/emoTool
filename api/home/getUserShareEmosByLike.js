const {UserShareEmos} = require('@/mysql/miniprogram/userShareEmos') ;// 引入数据库文件
const {User} = require('@/mysql/miniprogram/user.js');

const addLoopImgs = async (req, res, next) => {
  let currentPage = req.query.currentPage;
  const likeData = await UserShareEmos.getUserShareEmosByLike(currentPage);
  for(var i =0; i < likeData.length; i++){
    let emo = likeData[i];
    //em_user
    let em_user = await User.findById(emo.emUserId);
    emo.em_user = em_user[0] ? em_user[0] : {};
  }

  const countData = await UserShareEmos.getNowRecommend(currentPage);
  const data = {count:countData.count,rows:likeData};
  if (likeData){
    res.json(global.toJson(200, '获取成功',data))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = addLoopImgs;
