const {User} = require('@/mysql/miniprogram/user') ;// 引入数据库文件

const updateWXInfo = async (req, res, next) => {
  let data = req.body;
  // console.log(req.body);
  const endData = await User.updateUserById(data.id,data.username, data.usericon,data.showWXInfo);
  if (endData){
    let user = await User.findById(data.id);
    res.json(global.toJson(200, '修改成功',user[0]))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }

};
module.exports = updateWXInfo;

