const fs = require('fs');
const FormData = require('form-data')
const imgBasePath = 'public';
var request = require('request');//网络请求

const Upload = async (req, res, next) => {
  // req.file 是 前端表单name=="imageFile" 的文件信息（不是数组）
  // console.log('----------upload------------');
  // console.log(req.file.mimetype.split("/")[1]);
  //获取文件后缀
  let fileSuffix = 'jpg';
  if (req.file.mimetype.split("/")[1]){
    fileSuffix = req.file.mimetype.split("/")[1];
  }
  let fname = getFileName();
  let type = req.body.type;
  let dname = "";
  let openName = "";
  if (type === "loopimgs"){//多图转gif
    openName = '/images/loopimgs/';
  }else if (type === "baseEmo"){
    openName = '/images/baseEmo/';
  }else if (type === "imgToGif"){
    openName = '/images/imgToGif/'+ getDirectionName() + '/';
  }else if (type === "imgsToGif"){
    openName = '/images/imgsToGif/'+ getDirectionName() + '/';
  }else if (type === 'addSdm'){
    openName = '/images/addSdm/'+ getDirectionName() + '/';
  }else if (type === 'emohouse'){
    openName = '/images/emohouse/'+ getDirectionName() + '/';
  }else{
    openName = '/images/baseImg/' + getDirectionName() + '/';
  }
  dname = imgBasePath + openName;
  // console.log("============");
  // console.log(req.file);
  if (req.file.size > 1000000){//图片大于1M，不做处理，腾讯不支持
    // console.log("======大图片======");
    fs.exists(dname,function (exists) {
      if(exists){
        fs.rename(req.file.path, dname +'/' + fname + fileSuffix, function(err) {
          if (err) {
            throw err;
          }
        });
      }else{
        fs.mkdirSync(dname);
        fs.rename(req.file.path, dname +'/' + fname + fileSuffix, function(err) {
          if (err) {
            throw err;
          }
        });
      }
    });
    res.json(global.toJson(0, '上传成功',openName +fname+fileSuffix));
  } else{
//调用微信安全接口,校验图片是否违规。
    checkoutImg(_=>{
      fs.exists(dname,function (exists) {
        if(exists){
          fs.rename(req.file.path, dname +'/' + fname + fileSuffix, function(err) {
            if (err) {
              throw err;
            }
          });
        }else{
          fs.mkdirSync(dname);
          fs.rename(req.file.path, dname +'/' + fname + fileSuffix, function(err) {
            if (err) {
              throw err;
            }
          });
        }
      });
      res.json(global.toJson(0, '上传成功',openName +fname+fileSuffix));
    },req.file.path,res);
  }
};
//***校验图片是否违规***//
function checkoutImg(sus,img,res) {
  var  getTokenOption = {
    method: 'get',
    url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd9f8db0ea5c710e7&secret=19d0da7f0af5aafa2b2b138890f1dbc5",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  request(getTokenOption, async function (err, r, body) {
    if (err) {
      console.log(err);
      res.json(global.toJson(401, err))
    }else {
      let bodyJson = JSON.parse(body);
      let accessToken = bodyJson.access_token;
      const imgData = fs.createReadStream( process.cwd()+'/'+img);
      let formData = {
        media: imgData
      };
      var  checkOption = {
        method: 'post',
        url: "https://api.weixin.qq.com/wxa/img_sec_check?access_token=" + accessToken + "&appid=wxd9f8db0ea5c710e7",
        formData:formData
      };
      request(checkOption, async function (err, r, body) {
        if (err) {
          console.log(err);
          res.json(global.toJson(401, err))
        }else {
          //图片鉴黄接口调用成功
          let bodyJson = JSON.parse(body);
          if (bodyJson.errcode === 87014){
            res.json(global.toJson(401, "图片不合规"))
          } else{
            sus();
          }
        }
      });
    }
  });
}

//***工具方法***//
//获取文件名
function getFileName(){
  let name = new Date().getTime() + Math.random() + ".";
  return name;
}
//获取文件夹名字
function getDirectionName(){
  let date = new Date();
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let dname = y + "-" + m + "-" + d;
  return dname;
}

module.exports = Upload;
