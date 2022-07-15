const {sequelize} = require('@/mysql/utils');
const {MakePageThemm} = require('@/mysql/miniprogram/makePageThemm') ;// 引入数据库文件

const updateMakeTheme = async (req, res, next) => {

  console.log(req.body);
  let data = req.body.banner;
  if (data.id){
    console.log("修改");
    const endData = await MakePageThemm.updateData(data);
    if (endData){
      res.json(global.toJson(200, '修改成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  } else{
    console.log("添加");
    const endData = await MakePageThemm.insertData(data);
    if (endData){
      res.json(global.toJson(200, '添加成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  }
};
module.exports = updateMakeTheme;
