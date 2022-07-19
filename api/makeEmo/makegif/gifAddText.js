var GifGenerator = require('./gifHelper');
const {MakeBaseEmo} = require('@/mysql/miniprogram/makeBaseEmo') ;// 引入数据库文件
const {User} = require('@/mysql/miniprogram/user') ;// 引入数据库文件
const {ScroeRecord} = require('@/mysql/miniprogram/scroeRecord') ;// 引入数据库文件
const makeBaseEmoScroe = 0; //15 改为不需要积分
const getLoopImgs = async (req, res, next) => {
  let userId = req.body.userId;
  // let textInfo = req.body.textinfo;
  //1.先检查用户够不够积分
  const userScroeData = await User.findById(userId);
  let userScroe = userScroeData[0].scroe;
  if (+userScroe < makeBaseEmoScroe){//用户不够积分
    res.json({
      path: '',
      code:400
    });
  }else{
    setImmediate(async ()=>{
      //先减掉积分
      let newScroe = +userScroe - makeBaseEmoScroe;
      await User.updateUserScroeById(userId,newScroe);
      await ScroeRecord.sign(userId,1,"制作表情","动态表情加字",makeBaseEmoScroe,newScroe,getDateStr());
      let path = 'public' + req.body.path;
      let gifGenerator = new GifGenerator([],path);
      let texts = req.body.texts;
      let demo = await gifGenerator.generateAddText(texts);
      MakeBaseEmo.insertData(demo,userId);
      res.json(global.toJson(200, '制作成功',{path:demo,code:200}))
    })
  }
};

function getDateStr(){
  //获取当前日期
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10){
    month = "" + "0" + month;
  }
  if (day < 10){
    day = "" + "0" + day;
  }
  return "" + year + month + day;
}
module.exports = getLoopImgs;
