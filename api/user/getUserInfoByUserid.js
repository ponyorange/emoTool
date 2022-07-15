const {User} = require('@/mysql/miniprogram/user') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {
  let uid = req.query.uid;
  let data = await User.findById(uid);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = addLoopImgs;
