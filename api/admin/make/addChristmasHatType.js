const {ChristmasHatType} = require('@/mysql/miniprogram/christmasHatType') ;// 引入数据库文件

const getMakeThemm = async (req, res, next) => {
  let data = req.body.banner;
  if (data.id){
    const endData = await ChristmasHatType.updateimgType(data);
    if (endData){
      res.json(global.toJson(200, '修改成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  } else{
    const endData = await ChristmasHatType.insertData(data.title,data.iconPath);
    if (endData){
      res.json(global.toJson(200, '添加成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  }

};
module.exports = getMakeThemm;
