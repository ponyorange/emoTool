const fs = require('fs');

const openGifPath = 'make/imgsToGif/';
const gifPath = 'public/' + openGifPath;
// const baseURL = "/api/";
const { Image , registerFont} = require('canvas');
const magnify = 1.5;//放大倍数
const emoWH = 250 * magnify;

const imagesToEmo = async (req, res, next) => {
  //图片
  let imgw = req.body.imgw ;
  let imgh = req.body.imgh ;
  let imgs = req.body.imgs;
  let imgt = req.body.imgt;
  let images = [];
  let len = imgs.length;
  let sus = 0;
  for(var i = 0; i < len; i++){
    let img = new Image();
    img.index = i;
    img.onload = function () {
      images.push(img);
      sus += 1;
      if(sus === len){
        images.sort((a,b) => a.index - b.index);
        for (var j = 0; j < len; j++){
          console.log(images[j].index);
        }
        let data = imagesToGif(images,imgw,imgh,imgt);
        res.json({
          data:data,
        });
      }
    };
    img.src = 'public' + imgs[i];
  }
};

//多图转动图
function imagesToGif(imgs,imgw,imgh,imgt) {
  let GIFEncoder = require('gifencoder');
  let Canvas = require('canvas');
  let encoder = new GIFEncoder(imgw, imgh);
  encoder.start();
  encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
  encoder.setDelay(imgt);  // frame delay in ms
  encoder.setQuality(10); // image quality. 10 is default.

// use node-canvas
  let canvas = new Canvas.createCanvas(imgw, imgh);
  let ctx = canvas.getContext('2d');

  let len = imgs.length;
  let fname = new Date().getTime() + Math.random() + ".gif";
  let dname = gifPath + getDirectionName();
  for(var i = 0; i < len; i++){
    let img = imgs[i];
    ctx.drawImage(img, 0, 0,imgw,imgh);
    encoder.addFrame(ctx);
  }
  encoder.finish();
  let buf = encoder.out.getData();
  fs.exists(dname,function (exists) {
    if(exists){
      fs.writeFile(dname +'/'+ fname, buf, function (err) {
        console.log(err);
      });
    }else{
      fs.mkdirSync(dname);
      fs.writeFile(dname +'/'+ fname, buf, function (err) {
        console.log(err);
      });
    }
  });
  return openGifPath + getDirectionName() + '/' + fname;
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
module.exports = imagesToEmo;
