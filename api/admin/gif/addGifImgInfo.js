const {Basegifs} = require('@/mysql/admin/basegifs') ;// 引入数据库文件
var GifGenerator = require('./../../makeEmo/makegif/gifHelper')
const addLoopImgs = async (req, res, next) => {

  // console.log(req.body.banner);
  let data = req.body.banner;
  let gifGenerator = new GifGenerator(data.textInfo,'public' + data.path);
  let cover = await gifGenerator.getImgAtIndex(0);
  let demo = await gifGenerator.generate();
  let textInfo = JSON.stringify(data.textInfo);

  if (data.id){
    // console.log("修改");//path, textinfo,from,title,des
    const endData = await Basegifs.updateData(data.id,data.path, textInfo,data.from,data.title,data.des,cover,demo);
    if (endData){
      res.json(global.toJson(200, '修改成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  } else{
    // console.log("添加");//path, textinfo,from,title,des
    const endData = await Basegifs.insertData(data.path, textInfo,data.from,data.title,data.des,cover,demo);
    if (endData){
      res.json(global.toJson(200, '添加成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  }
};
module.exports = addLoopImgs;

