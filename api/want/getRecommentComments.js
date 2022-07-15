const {RecommendComments} = require('@/mysql/miniprogram/recommendComments') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  let data = req.query;
  console.log(data);
  let currentPage = data.currentPage;
  let rid = data.rid;
  const endData = await RecommendComments.getNowRecommend(rid, currentPage);
  if (endData){
    res.json(global.toJson(200, '评论成功',endData))
  } else{
    res.json(global.toJson(500, '未知错误',endData))
  }
};
module.exports = addLoopImgs;
