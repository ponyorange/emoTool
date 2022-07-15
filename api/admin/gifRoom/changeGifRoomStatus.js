const {GifRooms} = require('@/mysql/miniprogram/gifRooms') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {

  let status = req.body.status;
  let id = req.body.id;
  const endData = await GifRooms.updateStatus(id,status);
  if (endData){
    res.json(global.toJson(200, '修改成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = addLoopImgs;

