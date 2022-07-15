const md5 = require('js-md5');
var request = require('request');//网络请求
const getgif = require('@/api/makeEmo/baseEmoHelper') ;// 引入制作函数
const { Image , registerFont} = require('canvas');
const {MakeBaseEmo} = require('@/mysql/miniprogram/makeBaseEmo') ;// 引入数据库文件
const {EmoBaseImg} = require('@/mysql/miniprogram/emoBaseImg') ;// 引入数据库文件
const fs = require('fs');
const addLoopImgs = async (req, res, next) => {
  let msgType = req.body.msgType;
  if (msgType === "img"){//图片消息
    /*
      1.如果有字，则AI聊天，返回聊天文字
      2.如果没有字，则调AI看图说话接口，返回文字
      3.如果是动图，则返回一个表情包
    */
    let imgTypes = req.body.text.split(".");
    let imgType = imgTypes[imgTypes.length - 1];

    if (imgType === 'gif'){//gif图
      sengEmoToUser(res,req.body.msgIdx);
    } else{//不是gif图
      readImgText(res,req,'public' + req.body.text)
    }
  } else{//文字消息
    if (req.body.text[0] === "*"){//用户制作表情指令
      let text = req.body.text;
      text=text.substring(1,text.length);
      userMakeBaseEmo(text,res,req.body.msgIdx);
    } else{
      chatText(req,res);
    }
  }
};

function readImgText(res,req,imgPath){
  sengEmoToUser(res,req.body.msgIdx);

  let bitmap = fs.readFileSync(imgPath);

  let base64str = Buffer.from(bitmap, 'binary').toString('base64'); // base64编码

  let timeStamp = "" + Date.parse(new Date()) / 1000;

  let params = {

    app_id: "2111146074",

    image: base64str,

    time_stamp: timeStamp,

    nonce_str: randomString(16),

    sign:''

  };

  let appkey = 'rOB0VXxkqeOSLZbz';
  let sign = getReqSign(params, appkey);
  params['sign'] = sign;
  // console.log(params);
  var  checkOption = {
    method: 'post',
    url: "https://api.ai.qq.com/fcgi-bin/ocr/ocr_generalocr",
    formData:params
  };
  request(checkOption, async function (err, r, body) {
    if (err) {
      console.log(err);
    }else {
      // let bodyJson = JSON.parse(body);
      // console.log(bodyJson);
      console.log(body)
    }
  });
}

//斗图
async function sengEmoToUser(outRes,msgIdx) {
  let emos = await MakeBaseEmo.findAll();
  let idx = randNum(0,emos.length - 1);
  let path = "/"+emos[idx].path;
  let data = {msgIdx:msgIdx,answer:path,contentType:"img"};
  outRes.json(global.toJson(200, '获取成功',data))
}

//***调用腾讯AI接口聊天***//
function chatText(req,outRes) {
  let timeStamp = "" + Date.parse(new Date()) / 1000;

  let params = {

    app_id: "2111146074",

    question: req.body.text,

    session: timeStamp,

    nonce_str: randomString(16),

    time_stamp: timeStamp,

    sign:''

  };

  let appkey = 'rOB0VXxkqeOSLZbz';
  let sign = getReqSign(params, appkey);
  params['sign'] = sign;
  var  checkOption = {
    method: 'post',
    url: "https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat",
    formData:params
  };
  request(checkOption, async function (err, r, body) {
    if (err) {
      console.log(err);
    }else {
      let bodyJson = JSON.parse(body);
      bodyJson.data.msgIdx = req.body.msgIdx;
      bodyJson.data.contentType = "text";
      console.log(bodyJson);
      if (bodyJson.data.answer.length === 0){
        bodyJson.data.answer = "哎呀，我好像没听懂";
      }
      outRes.json(global.toJson(200, '获取成功',bodyJson.data))
    }
  });
}

function getReqSign(params, appkey) {

  let sortParams = jsonSort(params);

  let str = "";

  for (const key in sortParams) {

    if (sortParams[key]) {

      str = str + key + "=" + encodeURI(sortParams[key]) + "&"

    }

  }

  str = str + "app_key=" + appkey;

  let sign = md5(str).toUpperCase();

  return sign

}
function jsonSort(jsonData) {

  try {

    let tempJsonObj = {};

    let sdic = Object.keys(jsonData).sort();

    sdic.map((item, index) => {

      tempJsonObj[item] = jsonData[sdic[index]]

    })
    console.log("排序正确啊");
    return tempJsonObj;

  } catch (e) {
    console.log("排序出错了");
    return jsonData;

  }

}
//获取随机字符串
function randomString(len) {
   　　len = len || 32;
   　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
   　　var maxPos = $chars.length;
   　　var pwd = '';
   　　for (i = 0; i < len; i++) {
     　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
     　　}
  　　return pwd;
}
//获取随机数
function randNum(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//获得一张表情底图
async function getEmoBaseImg(){
  let imgs = await EmoBaseImg.findAll();

  let idx = randNum(0,imgs.length - 1);
  console.log('public' + imgs[idx].path);
  return 'public' + imgs[idx].path;
}
//用户制作表情
async function userMakeBaseEmo(text,outRes,msgIdx){
  const magnify = 1.5;//放大倍数
  //文字1
  let ts1 = 20 * magnify;
  let tc1 = '#000000';
  let t1 = text;
  let tx1 = 50 * magnify;
  let ty1 = (140 )* magnify + ts1 + 3;
  let th1 = 20;
  if(text.length > 9){
    tx1 = 0;
  }else{
    tx1 = (190-text.length*24)* magnify/2;
  }
  //双行？
  let isDoubleText = false;
  //文字2
  let ts2 = 0;
  let tc2 = 0;
  let t2 = 0;
  let tx2 = 0;
  let ty2 = 0;
  let th2 = 0;

  let emc = "#ffffff";
  var img = new Image();
  img.onload = function () {
    let imgx =  magnify;
    let imgy =  0;
    let emoPath = getgif(img,imgx,imgy,190* magnify,img.height/img.width*190* magnify,ts1,tc1,t1,tx1,ty1,th1,isDoubleText,ts2,tc2,t2,tx2,ty2,th2,emc);
    let data = {msgIdx:msgIdx,answer:"/"+emoPath,contentType:"img"};
    console.log(emoPath);
    outRes.json(global.toJson(200, '获取成功',data))
  };
  console.log(getEmoBaseImg());
  img.src = await getEmoBaseImg();
}
module.exports = addLoopImgs;

