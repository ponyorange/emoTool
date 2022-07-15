const {User} = require('@/mysql/miniprogram/user') ;// 引入数据库文件
const getLoopImgs = async (req, res, next) => {
  let currentPage = req.query.currentPage;
  let loginType = req.query.loginType;
  let data = await User.findAllUser(currentPage,loginType);
  res.json(global.toJson(200, '获取成功',data))
};
module.exports = getLoopImgs;
