var GifGenerator = require('./gifHelper');
const {User} = require('@/mysql/miniprogram/user') ;// 引入数据库文件
const {ScroeRecord} = require('@/mysql/miniprogram/scroeRecord') ;// 引入数据库文件
var request = require('request');//网络请求
const {MakeBaseEmo} = require('@/mysql/miniprogram/makeBaseEmo') ;// 引入数据库文件
const makeBaseEmoScroe = 20;
const getLoopImgs = async (req, res, next) => {
  let userId = req.body.userId;
  //1.先检查用户够不够积分
  const userScroeData = await User.findById(userId);
  let userScroe = userScroeData[0].scroe;
  if (+userScroe < makeBaseEmoScroe){//用户不够积分
    res.json({
      path: '',
      code:400
    });
  }else {
    //先减掉积分
    let textInfo = req.body.textinfo;
    let textString = "";
    for (var i = 0; i < textInfo.length; i++){
      textString = textString + textInfo[i].text;
    }
    checkoutText(textString,req,res,userScroe,userId)
  }
};

//***检验文字***//
function checkoutText(text,req,res,userScroe,userId) {
  var  getTokenOption = {
    method: 'get',
    url: "https://api.q.qq.com/api/getToken?grant_type=client_credential&appid=1109816085&secret=ILopMYRnVxQaEELx",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  request(getTokenOption, async function (err, r, b) {
    if (err) {
      console.log(err);
    }else {
      let bodyJson = JSON.parse(b);
      let accessToken = bodyJson.access_token;
      let bodyData = {
        content:text
      };
      var  checkOption = {
        method: 'post',
        url: "https://api.q.qq.com/api/json/security/MsgSecCheck?access_token=" + accessToken + "&appid=1109816085",
        json: true,
        headers: {
          "content-type": "application/json",
        },
        body:bodyData
      };
      request(checkOption, async function (err, r, body) {
        if (err) {
          console.log(err);
        }else {
          //图片鉴黄接口调用成功
          if (body.errCode === 87014){//违规了
            res.json({
              code:401,
              data: "文字违规啦，请检查文字",
            });
          } else{//不违规

            //先减掉积分
            let newScroe = +userScroe - makeBaseEmoScroe;
            await User.updateUserScroeById(userId,newScroe);
            await ScroeRecord.sign(userId,1,"制作表情","制作模版动态表情",makeBaseEmoScroe,newScroe,getDateStr());
            // let userId = req.body.userId;
            let textInfo = req.body.textinfo;
            let path = 'public' + req.body.path;
            let gifGenerator = new GifGenerator(textInfo,path);
            let demo = await gifGenerator.generate();
            MakeBaseEmo.insertData(demo,userId);
            res.json(global.toJson(200, '制作成功',{path:demo,code:200}))
          }
        }
      });
    }
  });
}

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
