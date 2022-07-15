const {Basegifs} = require('@/mysql/admin/basegifs') ;// 引入数据库文件
const deleteLoopImgs = async (req, res, next) => {

  console.log(req.body);
  let data = req.body.banner;

  console.log("删除");
  const endData = await Basegifs.deleteImg(data.id);
  if (endData){
    res.json(global.toJson(200, '删除成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }

};
module.exports = deleteLoopImgs;
