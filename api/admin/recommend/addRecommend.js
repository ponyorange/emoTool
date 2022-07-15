const {DayRecommend} = require('@/mysql/miniprogram/dayRecommend') ;// 引入数据库文件
const {RecommendSendUsers} = require('@/mysql/admin/recommendSendUsers') ;// 引入数据库文件
const baseUrl = "https://orange.seeyouweb.com";
var request = require('request');//网络请求
const AddDayRecommend = async (req, res, next) => {

  // console.log(req.body.banner);
  let data = req.body.banner;

  if (data.id){
    // console.log("修改");
    const endData = await DayRecommend.updateData(data.id,data.path, data.title,data.des);
    if (endData){
      res.json(global.toJson(200, '修改成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  } else{
    const endData = await DayRecommend.insertData(data.paths, data.title,data.des);
    // console.log(endData);
    // console.log("emoid=",endData.id);
    sendToWeChatSearch(data,endData.id);
    if (endData){
      const sendUsers = await RecommendSendUsers.findAllData();
      // console.log(sendUsers);
      for (var i = 0; i < sendUsers.rows.length; i++){
        let formid = sendUsers.rows[i].formid;
        let openid = sendUsers.rows[i].openid;

        if (sendUsers.rows[i].em_user.loginType === 1){//微信
          sendDingYueToWeChatUser(openid,data);
        } else if(sendUsers.rows[i].em_user.loginType === 0){//QQ
          sendToQQUser(formid,openid,data);
        }
      }
      res.json(global.toJson(200, '添加成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  }
};

function sendToWeChatUser(formid,openid,data){
  // //将消息推送给微信订阅用户
  var  options = {
    method: 'get',
    url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=xxx&secret=xxx"
  };
  request(options, async function (err, r, body) {
    if (err) {
      console.log(err);
    } else {
      let bodyJson = JSON.parse(body);
      var  sendOpt = {
        method: 'post',
        url: "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + bodyJson.access_token,
        json: true,
        body:{
          touser: openid,
          template_id: "3HnmWazO4FrmjPpVyO3LswTJpIaVTDDLlkJQppJAAWM",
          page: "/pages/loading/loading?navigate=recommendEmos",
          form_id: formid,
          data: {
            keyword1: {
              value: "西柚表情每日推荐"
            },
            keyword2: {
              value: data.title
            }
          }
        }
      };
      // console.log(sendOpt);
      request(sendOpt, async function (err, r, sbody) {
        console.log("---===---");
        // 不管推送是否成功，把数据库订阅记录删除
            RecommendSendUsers.deleteByOpenId(openid)
        // if (err) {
          console.log(err);
        // } else {
          console.log(sbody);
        //   if (sbody.errcode === 0){//推送成功，把数据库订阅记录删除
        //     RecommendSendUsers.deleteByOpenId(openid)
        //   }
        // }
      });

    }
  });
}
function sendToQQUser(formid,openid,data){
  // //将消息推送给微信订阅用户
  var  options = {
    method: 'get',
    url: "https://api.q.qq.com/api/getToken?grant_type=client_credential&appid=xxx&secret=xxx"
  };
  request(options, async function (err, r, body) {
    if (err) {
      console.log(err);
    } else {
      let bodyJson = JSON.parse(body);
      var  sendOpt = {
        method: 'post',
        url: "https://api.q.qq.com/api/json/subscribe/SendSubscriptionMessage?access_token=" + bodyJson.access_token,
        json: true,
        body:{
          touser: openid,
          template_id: "d1e87e3b5acdc2f485ff9b35aff8b833",
          page: "/pages/loading/loading?navigate=recommendEmos",
          form_id: formid,
          data:  {
            thing1: {
              value: data.title
            },
            thing3: {
              value: data.des
            }
          }
        }
      };
      // console.log(sendOpt);
      request(sendOpt, async function (err, r, sbody) {
        //不管推送是否成功，把数据库订阅记录删除
        RecommendSendUsers.deleteByOpenId(openid);
        console.log("---===---");
        // if (err) {
          console.log(err);
        // } else {
          console.log(sbody);
        //   if (sbody.errcode === 0){//推送成功，把数据库订阅记录删除
        //     RecommendSendUsers.deleteByOpenId(openid)
        //   }
        // }
      });

    }
  });
}
//发送微信订阅消息
function sendDingYueToWeChatUser(openid,data){
  // //将消息推送给微信订阅用户
  var  options = {
    method: 'get',
    url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=xxx&secret=xxx"
  };
  request(options, async function (err, r, body) {
    if (err) {
      console.log(err);
    } else {
      let bodyJson = JSON.parse(body);
      var  sendOpt = {
        method: 'post',
        url: "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=" + bodyJson.access_token,
        json: true,
        body:{
          touser: openid,
          template_id: "3HnmWazO4FrmjPpVyO3LswTJpIaVTDDLlkJQppJAAWM",
          page: "/pages/loading/loading?navigate=recommendEmos",
          data: {
            thing1: {
              value: data.title
            },
            thing3: {
              value: data.des
            }
          }
        }
      };
      // console.log(sendOpt);
      request(sendOpt, async function (err, r, sbody) {
        // 不管推送是否成功，把数据库订阅记录删除
        RecommendSendUsers.deleteByOpenId(openid);
        // console.log("---===---");
        // if (err) {
        //   console.log(err);
        // } else {
        //   console.log(sbody);
        //   if (sbody.errcode === 0){//推送成功，把数据库订阅记录删除
        //     RecommendSendUsers.deleteByOpenId(openid)
        //   }
        // }
      });

    }
  });
}
//推送给微信搜一搜
function sendToWeChatSearch(data,dataid){
  // //将消息推送给微信订阅用户
  var  options = {
    method: 'get',
    url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=xxx&secret=xxx"
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
              "query": "navigate=historyRecommendDetail&emoId=" + dataid,
              "data_list": [
                {
                  "@type": "wxsearch_cpdata",
                  "update":1,
                  "content_id":"" + dataid,
                  "category_id": 1, //1:综合，4：娱乐
                  "page_type": 2,
                  "title": data.title,
                  "abstract":[data.des],
                  "cover_img":[{
                    "cover_img_url":baseUrl + data.paths[0],
                    "cover_img_size":3
                  },{
                    "cover_img_url":baseUrl + data.paths[1],
                    "cover_img_size":3
                  },{
                    "cover_img_url":baseUrl + data.paths[2],
                    "cover_img_size":3
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
module.exports = AddDayRecommend;

