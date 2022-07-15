const {UserTaskRecord} = require('@/mysql/miniprogram/userTaskRecord') ;// 引入数据库文件
const updateWXInfo = async (req, res, next) => {
  let data = req.query;
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

  const endData = await UserTaskRecord.findByDayStr(data.id,dateStr);
  if (endData){
    res.json(global.toJson(200, '获取成功',endData))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = updateWXInfo;
