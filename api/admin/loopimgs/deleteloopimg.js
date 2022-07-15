const {sequelize} = require('@/mysql/utils');
const {LoopImgs} = require('@/mysql/miniprogram/loopImgs') ;// 引入数据库文件

const deleteLoopImgs = async (req, res, next) => {

  console.log(req.body);
  let data = req.body.banner;

  console.log("删除");
  const endData = await LoopImgs.deleteById(data.id);
  if (endData){
    res.json(global.toJson(200, '删除成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }

};
module.exports = deleteLoopImgs;
