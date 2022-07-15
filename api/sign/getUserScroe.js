const {User} = require('@/mysql/miniprogram/user') ;// 引入数据库文件

const updateWXInfo = async (req, res, next) => {
  let data = req.query;
  const endData = await User.findById(data.id);
  if (endData){
    res.json(global.toJson(200, '获取成功',{scroe:endData[0].scroe}))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = updateWXInfo;
