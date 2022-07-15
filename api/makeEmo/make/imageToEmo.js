const fs = require('fs');

// const baseURL = "/api/";
const { Image , registerFont} = require('canvas');
const magnify = 1.5;//放大倍数
const emoWH = 250 * magnify;
const openImgToGifPath = 'make/imgToGif/';
const imgToGifPath = 'public/' + openImgToGifPath;

const imageToEmo = async (req, res, next) => {
  //图片
  let imgw = req.body.imgw ;
  let imgh = req.body.imgh ;
  var img = new Image();
  img.onload = function () {
    res.json({
      data:imgToGif(imgw,imgh,img),
    });
  };
  img.src = 'public' + req.body.img;
};


//图片转表情包
function imgToGif(imgw,imgh,img){
  var GIFEncoder = require('gifencoder');
  var Canvas = require('canvas');
  var encoder = new GIFEncoder(imgw, imgh);
  encoder.start();
  encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
  encoder.setDelay(500);  // frame delay in ms
  encoder.setQuality(10); // image quality. 10 is default.
  // encoder.setTransparent('rgba(0,0,0,0)');
// use node-canvas
  let canvas = new Canvas.createCanvas(imgw, imgh);
  let ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0,imgw,imgh);
  encoder.addFrame(ctx);
  encoder.finish();
  var buf = encoder.out.getData();

  let fname = new Date().getTime() + Math.random() + ".gif";
  let dname = imgToGifPath + getDirectionName();
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

  return openImgToGifPath + getDirectionName() + '/' + fname;
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

module.exports = imageToEmo;
