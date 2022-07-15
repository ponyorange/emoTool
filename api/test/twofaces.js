var request = require('request');//网络请求
const fs = require('fs');

const addLoopImgs = async (req, res, next) => {

  var  options = {
    method: 'get',
    url: "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=qFvaxpXKs9YwFozPhthef9L2&client_secret=YBZhd67alwScrqdwImag7qI60lsuNWTI",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  request(options, async function (err, r, body) {
    if (err) {
      console.log(err);
      res.json(global.toJson(401, err))
    } else {
      let data = JSON.parse(body);
      let token = data.access_token;
      let img1 = fs.readFileSync('public/images/testImg/1.jpg');
      let img2 = fs.readFileSync('public/images/testImg/2.jpg');
      let img1Base64 = img1.toString('base64');
      let img2Base64 = img2.toString('base64');
      console.log(img1);
      console.log(img1Base64);
      var  faceoptions = {
        method: 'post',
        url: "https://aip.baidubce.com/rest/2.0/face/v1/merge?access_token=" + token,
        headers: {
          'Content-Type':'application/json; charset=UTF-8'
        },
        json: true,
        body:{
          "image_template":{"image":img1Base64,"image_type":"BASE64","quality_control":"NONE"},
          "image_target":{"image":img2Base64,"image_type":"BASE64","quality_control":"NONE"}}
      };
      request(faceoptions, async function (err, r, imgbody) {
        if (err) {
          console.log(err);
          res.json(global.toJson(401, err))
        } else {
          res.json(global.toJson(200, '获取成功',imgbody));
        }
      });
    }
  });
};
module.exports = addLoopImgs;
