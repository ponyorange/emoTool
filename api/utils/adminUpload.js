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
  }else{
    openName = '/images/baseImg/' + getDirectionName() + '/';
  }
  dname = imgBasePath + openName;
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
};

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
