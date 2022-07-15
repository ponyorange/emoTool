var GifGenerator = require('./gifEmoHelper');
const {MakeBaseEmo} = require('@/mysql/miniprogram/makeBaseEmo') ;// 引入数据库文件
const getLoopImgs = async (req, res, next) => {
  let userId = req.body.userId;
  let textInfo = req.body.textinfo;
  let path = 'public' + req.body.path;
  let gifGenerator = new GifGenerator(textInfo,path);
  let demo = await gifGenerator.generate();
  MakeBaseEmo.insertData(demo,userId);
  res.json(global.toJson(200, '制作成功',{path:demo}))
};
module.exports = getLoopImgs;
