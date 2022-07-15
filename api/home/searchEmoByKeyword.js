const {PublicEmoHouse} = require('@/mysql/emohouse/publicEmoHouse') ;// 引入数据库文件
const {SearchRecords} = require('@/mysql/miniprogram/searchRecords') ;// 引入数据库文件

const getLoopImgs = async (req, res, next) => {
  let keyword = req.query.keyword;
  let currentPage = req.query.currentPage;
  let userid = req.query.userid;
  let keywordType = req.query.keywordType;
  //记录搜索记录
  await SearchRecords.insertData(keyword, keywordType ,userid);
  //返回搜索结果
  let data = await PublicEmoHouse.findByKeywordPage(currentPage,keyword);
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = getLoopImgs;
