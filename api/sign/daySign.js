const {SignRecord} = require('@/mysql/miniprogram/signRecord') ;// 引入数据库文件
const {ScroeRecord} = require('@/mysql/miniprogram/scroeRecord') ;// 引入数据库文件
const {UserTaskRecord} = require('@/mysql/miniprogram/userTaskRecord') ;// 引入数据库文件
const {User} = require('@/mysql/miniprogram/user') ;// 引入数据库文件
const updateWXInfo = async (req, res, next) => {
  let signGetScroe = 5;
  let data = req.body;
  //获取当前日期
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10){
    month = "" + "0" + month;
  }
  if (day < 10){
    day = "" + "0" + day;
  }
  let dateStr = ""+year+month+day;
  const endData = await SignRecord.insertData(data.id,dateStr);
  const taskData = await UserTaskRecord.insertData(data.id,0,dateStr);
  const userScroeData = await User.findById(data.id);
  let newScroe = userScroeData[0].scroe + signGetScroe;
  const changeScroe = await User.updateUserScroeById(data.id,newScroe);
  const scroeData = await ScroeRecord.sign(data.id,0,"邀请新用户","邀请新用户获得积分",signGetScroe,newScroe,dateStr);
  if (scroeData && changeScroe){
    res.json(global.toJson(200, '签到成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }

};
module.exports = updateWXInfo;

