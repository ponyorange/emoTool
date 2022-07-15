const {UserEmoHouse} = require('@/mysql/emohouse/userEmoHouse') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {
  let imgpath = req.body.imgpath;
  let uid = req.body.uid;
  let data = await UserEmoHouse.removeByUidEid(imgpath,uid);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = addLoopImgs;
