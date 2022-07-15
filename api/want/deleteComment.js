const {RecommendComments} = require('@/mysql/miniprogram/recommendComments') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  let data = req.body;
  const endData = await RecommendComments.deleteById(data.id);
  if (endData){
    res.json(global.toJson(200, '删除成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = addLoopImgs;
