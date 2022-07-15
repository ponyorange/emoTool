const {EmoHouseSorts} = require('@/mysql/emohouse/emoHouseSorts') ;// 引入数据库文件
const {PublicEmoHouse} = require('@/mysql/emohouse/publicEmoHouse') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  let currentPage = req.query.currentPage;
  let data = await EmoHouseSorts.fillEmoHouseSorts(currentPage);
  // let len = data.rows.length;
  // for (var i = 0; i < len; i++){
  //   let sid = data.rows[i].id;
  //   console.log('sid=',sid);
  //   let pemos = await PublicEmoHouse.findByemEmoHouseSortsId(sid);
  //   let pemo = pemos[0];
  //   await EmoHouseSorts.updateiconpath(sid,pemo.path);
  // }
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = addLoopImgs;
