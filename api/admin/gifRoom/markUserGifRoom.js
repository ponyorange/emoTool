const {UserGifRoomMarks} = require('@/mysql/miniprogram/userGifRoomMarks') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {

  let userid = req.body.userId;
  let markId = req.body.markId;
//  先查有没有这条数据，如果有则修改，没有则插入
  let mark = await UserGifRoomMarks.findUserMark(userid);
  let data;
  if (mark.length > 0){//修改
    data = await UserGifRoomMarks.updateMark(0, markId, userid);
  } else{//插入
    data = await UserGifRoomMarks.insertData(0, markId, userid);
  }
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = addLoopImgs;

