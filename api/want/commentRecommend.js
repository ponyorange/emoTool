const {RecommendComments} = require('@/mysql/miniprogram/recommendComments') ;// 引入数据库文件
const request = require('request');//网络请求
const addLoopImgs = async (req, res, next) => {
  let data = req.body;
  const endData = await RecommendComments.insertData(data.susImgUrl, data.text,"",data.uid,data.rid);
  if (data.text) {
    checkoutText(data.text,endData.id);
  }
  if (endData){
    res.json(global.toJson(200, '评论成功'))
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
//***检验文字***//
function checkoutText(text,eid) {
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
            RecommendComments.updateComment(eid,"***内容违规***");
          } else{
            console.log("文字不违规");
          }
        }
      });
    }
  });
}

module.exports = addLoopImgs;
