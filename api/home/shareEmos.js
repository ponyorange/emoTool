const {UserShareEmos} = require('@/mysql/miniprogram/userShareEmos') ;// 引入数据库文件
const baseUrl = "https://orange.seeyouweb.com";
const request = require('request');//网络请求
const addLoopImgs = async (req, res, next) => {
  console.log(req.body);
  let data = req.body;
  const endData = await UserShareEmos.insertData(data.imgs, data.title,data.des,data.userid);
  if (data.title) {
    checkoutText(data.title,0,endData.id);
  }
  if (data.des) {
    checkoutText(data.des,1,endData.id);
  }
  if (endData){
    //推送给微信搜一搜
    sendToWeChatSearch(data,endData.id);
    res.json(global.toJson(200, '发布成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
//***检验文字***//
function checkoutText(text,type,eid) {
  var  getTokenOption = {
    method: 'get',
    url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd9f8db0ea5c710e7&secret=19d0da7f0af5aafa2b2b138890f1dbc5",
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
        url: "https://api.weixin.qq.com/wxa/msg_sec_check?access_token=" + accessToken + "&appid=wxd9f8db0ea5c710e7",
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
          if (body.errcode === 87014){
            if (type === 0){
              UserShareEmos.updateTitle(eid,"***标题违规***");
            } else{
              UserShareEmos.updateDes(eid,"***描述违规***");
            }
          } else{
            console.log("文字不违规");
          }
        }
      });
    }
  });
}

//推送给微信搜一搜
function sendToWeChatSearch(data,dataid){
  // //将消息推送给微信订阅用户
  var  options = {
    method: 'get',
    url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx2c8c2bc83e9d6c91&secret=3ef7721fde8d59d92918e1be6174ea23"
  };
  request(options, async function (err, r, body) {
    if (err) {
      console.log(err);
    } else {
      let bodyJson = JSON.parse(body);
      var  sendOpt = {
        method: 'post',
        url: "https://api.weixin.qq.com/wxa/search/wxaapi_submitpages?access_token=" + bodyJson.access_token,
        json: true,
        body:{
          pages: [
            {
              "path": "pages/home/index",
              "query": "navigate=shareEmoDetail&emoId=" + dataid,
              "data_list": [
                {
                  "@type": "wxsearch_cpdata",
                  "update":1,
                  "content_id":"" + dataid,
                  "category_id": 1,//1:综合，4：娱乐
                  "page_type": 2,
                  "title": data.title + "表情",
                  "abstract":[data.des + "表情"],
                  "cover_img":[{
                    "cover_img_url":baseUrl + data.imgs[0],
                    "cover_img_size":1
                  }],
                  "mainbody":"套路搞笑表情包制作小程序给你推荐表情啦，推荐表情：" + data.title + "表情描述：" + data.des,
                  "time_publish":Math.floor(Date.now()/1000),
                  "time_modify":Math.floor(Date.now()/1000),
                  "searchword":["微信表情包制作器"]
                }
              ]
            }
          ]
        }
      };
      // console.log(sendOpt);
      request(sendOpt, async function (err, r, sbody) {
        console.log("---===---");
        // // 不管推送是否成功，把数据库订阅记录删除
        // // if (err) {
        // console.log(err);
        // // } else {
        console.log(sbody);
        //   if (sbody.errcode === 0){//推送成功，把数据库订阅记录删除
        //     RecommendSendUsers.deleteByOpenId(openid)
        //   }
        // }
      });
    }
  });
}
module.exports = addLoopImgs;

