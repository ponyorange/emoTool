const {UserUnreadMessages} = require('@/mysql/miniprogram/userUnreadMessages') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  let userid = req.query.userid;
  let data = await UserUnreadMessages.readAllMessage(userid);
//  返回数据
  if(data){
    res.json(global.toJson(200, '获取成功',data));
  }else {
    res.json(global.toJson(500, '未知错误',data));
  }
};
module.exports = addLoopImgs;
