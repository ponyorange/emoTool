const {UserGifRoomMarks} = require('@/mysql/miniprogram/userGifRoomMarks') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {

  let userid = req.query.userId;
  const data = await UserGifRoomMarks.findUserMark(userid);
  if (data){
    res.json(global.toJson(200, '获取成功',data))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = addLoopImgs;

