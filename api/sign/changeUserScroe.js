const {User} = require('@/mysql/miniprogram/user') ;// 引入数据库文件
const updateWXInfo = async (req, res, next) => {
  let data = req.body;
  const endData = await User.updateUserScroeById(data.id,data.score);
  if (endData){
    res.json(global.toJson(200, '修改成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }

};
module.exports = updateWXInfo;

