const {UserShareEmos} = require('@/mysql/miniprogram/userShareEmos') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  let id = req.query.id;
  const data = await UserShareEmos.findById(id);
  if (data){
    res.json(global.toJson(200, '获取成功',data[0]))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = addLoopImgs;
