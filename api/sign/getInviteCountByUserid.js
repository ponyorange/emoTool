const {UserInviteRecords} = require('@/mysql/miniprogram/userInviteRecords') ;// 引入数据库文件
const updateWXInfo = async (req, res, next) => {
  let userid = req.query.userid;
  console.log("===---===");
  console.log(userid);
  const endData = await UserInviteRecords.findInviteCountByUserid(userid);
  if (endData){
    res.json(global.toJson(200, '获取成功',endData))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = updateWXInfo;
