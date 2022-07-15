const {UserUnreadMessages} = require('@/mysql/miniprogram/userUnreadMessages') ;// 引入数据库文件
// const {UserShareEmos} = require('@/mysql/miniprogram/userShareEmos') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  let userid = req.query.userid;
  let currentPage = req.query.currentPage;
  let data = await UserUnreadMessages.getHistoryMessage(userid,currentPage);
  res.json(global.toJson(200, '获取成功',data));
};
module.exports = addLoopImgs;
