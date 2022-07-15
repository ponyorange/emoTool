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
    url: "https://api.q.qq.com/api/getToken?grant_type=client_credential&appid=1109816085&secret=ILopMYRnVxQaEELx"
  };
  request(options, async function (err, r, body) {
    if (err) {
      // console.log("----");
      console.log(err);
    } else {
      // console.log("--111--");
      let bodyJson = JSON.parse(body);
      // console.log(bodyJson.access_token);
      var  sendOpt = {
        method: 'post',
        url: "https://api.q.qq.com/api/json/qqa/CreateMiniCode?access_token=" + bodyJson.access_token,
        encoding:null,
        responseType: 'arraybuffer',
        json:true,
        body:{
          scene: userId,
          path: "pages/loading/loading",
          width: 280,
          appid:"1109816085"
        }
      };
      request(sendOpt, async function (err, rres, sbody) {
        console.log("====");
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

