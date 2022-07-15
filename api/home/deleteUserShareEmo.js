const {UserShareEmos} = require('@/mysql/miniprogram/userShareEmos') ;// 引入数据库文件
const {UserShareEmoLikes} = require('@/mysql/miniprogram/userShareEmoLikes') ;// 引入数据库文件

const deleteLoopImgs = async (req, res, next) => {
  let id = req.body.id;
  const endData = await UserShareEmos.deleteById(id);
  const likeData = await UserShareEmoLikes.deleteByEmoId(id);
  if (endData){
    res.json(global.toJson(200, '删除成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }

};
module.exports = deleteLoopImgs;
