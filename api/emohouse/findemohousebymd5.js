const {PublicEmoHouse} = require('@/mysql/emohouse/publicEmoHouse') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {
  let md5 = req.query.md5;
  let data = await PublicEmoHouse.findByMd5(md5);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = addLoopImgs;
