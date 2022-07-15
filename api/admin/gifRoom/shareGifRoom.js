const {GifRooms} = require('@/mysql/miniprogram/gifRooms') ;// 引入数据库文件
var GifGenerator = require('./../../makeEmo/makegif/gifHelper');
const addLoopImgs = async (req, res, next) => {

  // console.log(req.body.banner);
  let data = req.body;
  let gifGenerator = new GifGenerator(data.textInfo,'public' + data.path);
  // let demo = await gifGenerator.generate();
  let cover = await gifGenerator.getImgAtIndex(0);
  // let textInfo = JSON.stringify(data.textInfo);

  // path, cover,from,title,des,denyReson,status,emUserId
  if (data.id){
    // console.log("修改");//path, textinfo,from,title,des
    const endData = await GifRooms.updateData(data.id,data.path,cover,"用户发布",data.title,"","待审核",0,req.body.userid);
    if (endData){
      res.json(global.toJson(200, '修改成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  } else{
    // console.log("添加");//path, textinfo,from,title,des
    const endData = await GifRooms.insertData(data.path,cover,"用户发布",data.title,"","待审核",0,req.body.userid);
    if (endData){
      res.json(global.toJson(200, '添加成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  }
};
module.exports = addLoopImgs;

