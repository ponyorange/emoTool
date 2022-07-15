const {EmoBaseImg} = require('@/mysql/miniprogram/emoBaseImg') ;// 引入数据库文件

const deleteMakeBaseImg = async (req, res, next) => {
  // let data = await EmoBaseImg.findMakeBaseImgs();
  // console.log(req.body);
  let id = req.body.id;
  await EmoBaseImg.destroy({
    where: {id}
  });
  res.json(global.toJson(200, '删除成功'))
};
module.exports = deleteMakeBaseImg;
