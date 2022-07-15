const {UserFollewers} = require('@/mysql/emohouse/userFollewers') ;// 引入数据库文件
const addLoopImgs = async (req, res, next) => {
  let uid = req.query.uid;
  let listtype = req.query.listtype;//0 关注列表，1 粉丝列表
  let currentPage = req.query.currentPage;
  let data = {};
  console.log('listtype==',listtype);
  if (+listtype === 0){
    console.log("获取关注");
    data = await UserFollewers.findByfollowUid(currentPage,uid);
  } else{
    console.log("获取粉丝");
    data = await UserFollewers.findByUid(currentPage,uid);
  }
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = addLoopImgs;
