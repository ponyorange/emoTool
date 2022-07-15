var request = require('request');//网络请求
const fs = require('fs');
const openBaseEmoPath = 'images/qrcode/';
const baseEmoPath = 'public/' + openBaseEmoPath;
const updateWXInfo = async (req, res, next) => {
  let data = req.query;
  console.log(data);
  let userId = data.userid;
  // //获取小程序码
  var  options = {
    method: 'get',
    url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx2c8c2bc83e9d6c91&secret=3ef7721fde8d59d92918e1be6174ea23"
  };
  request(options, async function (err, r, body) {
    if (err) {
      // console.log("----");
      console.log(err);
    } else {
      // console.log("--111--");
      let bodyJson = JSON.parse(body);
      console.log(bodyJson.access_token);
      var  sendOpt = {
        method: 'post',
        url: "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=" + bodyJson.access_token,
        encoding:null,
        responseType: 'arraybuffer',
        json:true,
        body:{
          scene: userId,
          page: "pages/loading/loading",
          width: 280,
        }
      };
      request(sendOpt, async function (err, rres, sbody) {
        // console.log("====");
        // console.log(sbody);
        //把二维码存起来
        // let fname = new Date().getTime() + Math.random() + ".jpeg";
        //
        // fs.writeFile(baseEmoPath +'/'+ fname, sbody, function (err) {
        //   console.log(err);
        // });
        // res.json(global.toJson(200, '获取成功',{src:openBaseEmoPath+'/'+fname}));

        let base64 = Buffer.from(sbody, 'utf8').toString('base64');
        res.json(global.toJson(200, '获取成功',{base64}));
      });

    }
  });
};
module.exports = updateWXInfo;

