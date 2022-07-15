const {MakeBaseEmo} = require('@/mysql/miniprogram/makeBaseEmo') ;// 引入数据库文件
const getgif = require('@/api/makeEmo/baseEmoHelper') ;// 引入制作函数
const {User} = require('@/mysql/miniprogram/user') ;// 引入数据库文件
const {ScroeRecord} = require('@/mysql/miniprogram/scroeRecord') ;// 引入数据库文件
// const fs = require('fs');
var request = require('request');//网络请求
// const baseURL = "/api/";
const { Image , registerFont} = require('canvas');
const magnify = 2;//放大倍数
const emoWH = 250 * magnify;
const makeBaseEmoScroe = 5;
// const openBaseEmoPath = 'make/baseEmo/';
// const baseEmoPath = 'public/' + openBaseEmoPath;

const makeBaseEmo = async (req, res, next) => {
  //1.先检查用户够不够积分
  let userId = req.body.userId;
  const userScroeData = await User.findById(userId);
  let userScroe = userScroeData[0].scroe;
  if (+userScroe < makeBaseEmoScroe){//用户不够积分
    res.json({
      data: '',
      code:400
    });
  } else {//用户够积分,扣除积分，制作表情
    let checkText = req.body.t1 + req.body.t2;
    checkoutText(checkText,req,res,userScroe,userId);
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
            await ScroeRecord.sign(userId,1,"制作表情","制作静态表情",makeBaseEmoScroe,newScroe,getDateStr());
//图片
            let imgx = req.body.imgx * magnify;
            let imgy = req.body.imgy * magnify;
            let imgw = req.body.imgw * magnify;
            let imgh = req.body.imgh * magnify;
            //文字1
            let ts1 = req.body.ts1 * magnify;
            let tc1 = req.body.tc1;
            let t1 = req.body.t1;
            let tx1 = req.body.tx1 * magnify;
            let ty1 = (req.body.ty1 )* magnify + ts1 + 3;
            let th1 = req.body.th1;
            //双行？
            let isDoubleText = req.body.isDoubleText;
            //文字2
            let ts2 = req.body.ts2 * magnify;
            let tc2 = req.body.tc2;
            let t2 = req.body.t2;
            let tx2 = req.body.tx2 * magnify;
            let ty2 = (req.body.ty2 )* magnify + ts2 + 3;
            let th2 = req.body.th2;

            let emc = req.body.emoBgc;
            var img = new Image();
            img.onload = function () {
              let emoPath = getgif(img,imgx,imgy,imgw,imgh,ts1,tc1,t1,tx1,ty1,th1,isDoubleText,ts2,tc2,t2,tx2,ty2,th2,emc,emoWH);
              MakeBaseEmo.insertData(emoPath,userId);
              res.json({
                code:200,
                data: emoPath,
              });
            };
            img.src = 'public' + req.body.img;
          }
        }
      });
    }
  });
}
function pythonGet(){
  var  getTokenOption = {
    method: 'get',
    url: "http://0.0.0.0:5590/index1",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  request(getTokenOption, async function (err, r, body) {
    if (err) {
      console.log("pythonget-err");
      console.log(err);
    }else {
      console.log("pythonget-sus");
      console.log(body);
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
module.exports = makeBaseEmo;
