const {UserEmoHouse} = require('@/mysql/emohouse/userEmoHouse') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {
  let imgpath = req.query.imgpath;
  let uid = req.query.uid;
  let data = await UserEmoHouse.findByUidEid(imgpath,uid);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = addLoopImgs;
