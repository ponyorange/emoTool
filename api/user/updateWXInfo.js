const {sequelize} = require('@/mysql/utils');
const {User} = require('@/mysql/miniprogram/user') ;// 引入数据库文件

const updateWXInfo = async (req, res, next) => {

  console.log(req.body);
  let data = req.body;

  const endData = await User.updateWXInfoById(data.id,data.wxname, data.wxicon);
  if (endData){
    let user = await User.findById(data.id);
    res.json(global.toJson(200, '修改成功',user[0]))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }

};
module.exports = updateWXInfo;

