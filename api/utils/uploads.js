const {sequelize} = require('@/mysql/utils');
const fs = require('fs');
const imgBasePath = 'public';

const Uploads = async (req, res, next) => {
  console.log('----------uploads----------');
  let imgs = req.files.imgs;
  let urls = [];
  for (var i =0; i < imgs.length; i++){
    let img = imgs[i];
    //获取文件后缀
    let fileSuffix = 'jpg';
    if (img.mimetype.split("/")[1]){
      fileSuffix = img.mimetype.split("/")[1];
    }
    let fname = getFileName();
    let type = req.body.type;
    let dname = "";
    let openName = "";
    if (type === "loopimgs"){//多图转gif
      openName = '/images/loopimgs/';
    }else{
      openName = '/images/baseImg/' + getDirectionName() + '/';
    }
    dname = imgBasePath + openName;
    fs.exists(dname,function (exists) {
      if(exists){
        fs.rename(img.path, dname +'/' + fname + fileSuffix, function(err) {
          if (err) {
            throw err;
          }
        });
      }else{
        fs.mkdirSync(dname);
        fs.rename(img.path, dname +'/' + fname + fileSuffix, function(err) {
          if (err) {
            throw err;
          }
        });
      }
    });
    urls.push(openName +fname+fileSuffix);
  }
  res.json(global.toJson(0, '上传成功',urls));
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

module.exports = Uploads;
