const {User} = require('@/mysql/miniprogram/user') ;// 引入数据库文件


const addLoopImgs = async (req, res, next) => {
  let username = req.body.username;
  let usericon = req.body.usericon;
  let id = req.body.id;
  let endData;
  if (id){
    endData = await User.updateUserById(id,username,usericon);
    console.log("修改"+id)
  } else{
    endData = await User.insertSystemUser(username,usericon);
    console.log("添加")
  }
  if (endData){
    res.json(global.toJson(200, '获取成功',endData))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = addLoopImgs;
