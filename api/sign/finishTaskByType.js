// const {SignRecord} = require('@/mysql/miniprogram/signRecord') ;// 引入数据库文件
const {ScroeRecord} = require('@/mysql/miniprogram/scroeRecord') ;// 引入数据库文件
const {UserTaskRecord} = require('@/mysql/miniprogram/userTaskRecord') ;// 引入数据库文件
const {User} = require('@/mysql/miniprogram/user') ;// 引入数据库文件
const updateWXInfo = async (req, res, next) => {
  let signGetScroe = 5;
  let data = req.body;
  let type = data.type;
  if (type === 0){//签到
    signGetScroe = 5;
  } else if (type === 1){//分享表情
    signGetScroe = 10;
  } else if (type === 2){//制作表情
    signGetScroe = 5;
  } else if (type === 3){//分享抖图
    signGetScroe = 20;
  } else if (type === 4){//订阅推荐
    signGetScroe = 15;
  }
  let title = "每日签到";
  if (type === 0){//签到
    title = "每日签到";
  } else if (type === 1){//分享表情
    title = "分享表情";
  } else if (type === 2){//制作表情
    title = "制作表情";
  } else if (type === 3){//分享抖图
    title = "分享抖图";
  } else if (type === 4){//订阅推荐
    title = "订阅推荐";
  }
  let des = "每日签到获得积分";
  if (type === 0){//签到
    des = "每日签到获得积分";
  } else if (type === 1){//分享表情
    des = "每天分享了一组表情获得积分";
  } else if (type === 2){//制作表情
    des = "每天制作一个表情获得积分";
  } else if (type === 3){//分享抖图
    des = "每天分享一个抖图获得积分";
  } else if (type === 4){//订阅推荐
    des = "订阅推荐获得积分";
  }
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
  // const endData = await SignRecord.insertData(data.id,dateStr);
  const taskData = await UserTaskRecord.insertData(data.id,type,dateStr);
  const userScroeData = await User.findById(data.id);
  let newScroe = userScroeData[0].scroe + signGetScroe;
  const changeScroe = await User.updateUserScroeById(data.id,newScroe);
  const scroeData = await ScroeRecord.sign(data.id,0,title,des,signGetScroe,newScroe,dateStr);
  if (scroeData && changeScroe){
    res.json(global.toJson(200, '任务完成成功',{getScroe:signGetScroe}))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }

};
module.exports = updateWXInfo;

