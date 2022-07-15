const {ShareEmoReports} = require('@/mysql/admin/shareEmoReports') ;// 引入数据库文件

const deleteLoopImgs = async (req, res, next) => {
  let type = req.body.type;
  let userid = req.body.userid;
  let emoid = req.body.emoid;
  const endData = await ShareEmoReports.insertData(type,userid,emoid);
  if (endData){
    res.json(global.toJson(200, '举报成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }

};
module.exports = deleteLoopImgs;
