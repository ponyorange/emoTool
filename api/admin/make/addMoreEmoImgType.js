const {EmoBaseImgType} = require('@/mysql/miniprogram/emoBaseImgType') ;// 引入数据库文件

const getMakeThemm = async (req, res, next) => {
  let data = req.body.banner;
  if (data.id){
    const endData = await EmoBaseImgType.updateimgType(data);
    if (endData){
      res.json(global.toJson(200, '修改成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  } else{
    const endData = await EmoBaseImgType.insertData(data.title,data.iconPath);
    if (endData){
      res.json(global.toJson(200, '添加成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  }

};
module.exports = getMakeThemm;
