const {SignRecord} = require('@/mysql/miniprogram/signRecord') ;// 引入数据库文件

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
  const endData = await SignRecord.findByIdAndDay(data.id,dateStr);
  if (endData){
    if (endData[0]){//isSigned:1.已经签到；0。未签到
      res.json(global.toJson(200, '获取成功',{isSigned:1}))
    } else{
      res.json(global.toJson(200, '获取成功',{isSigned:0}))
    }

  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = updateWXInfo;
