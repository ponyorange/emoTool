const {sequelize} = require('@/mysql/utils');
const {DayRecommend} = require('@/mysql/miniprogram/dayRecommend') ;// 引入数据库文件

const getNowDayRecommend = async (req, res, next) => {
  let data = {};
  if (req.query.id){
    data = await DayRecommend.findById(req.query.id);
    res.json(global.toJson(200, '来了老弟',data[0]))
  } else{
    data = await DayRecommend.getNowRecommend();
    res.json(global.toJson(200, '来了老弟',data.rows[0]))
  }
};
module.exports = getNowDayRecommend;
