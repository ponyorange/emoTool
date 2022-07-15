const {RecommendSendUsers} = require('@/mysql/admin/recommendSendUsers') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  console.log(req.body);
  let data = req.body;
  const endData = await RecommendSendUsers.findByUserId(data.userid);
  if (endData.length >= 1){
    res.json(global.toJson(200, '已经订阅'))
  } else if (endData.length === 0) {
    res.json(global.toJson(201, '没有订阅'))
  }else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = addLoopImgs;

