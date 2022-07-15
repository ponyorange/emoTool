const {UserShareEmoComments} = require('@/mysql/miniprogram/userShareEmoComments.js');
const deleteLoopImgs = async (req, res, next) => {
  let id = req.body.id;
  const endData = await UserShareEmoComments.deleteById(id);
  if (endData){
    res.json(global.toJson(200, '删除成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }

};
module.exports = deleteLoopImgs;
