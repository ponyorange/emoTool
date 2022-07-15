const {sequelize} = require('@/mysql/utils');
const {DayRecommend} = require('@/mysql/miniprogram/dayRecommend') ;// 引入数据库文件

const getNowDayRecommend = async (req, res, next) => {
  let currentPage = req.query.currentPage;
  let data = await DayRecommend.getNowRecommend(currentPage);

  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = getNowDayRecommend;
