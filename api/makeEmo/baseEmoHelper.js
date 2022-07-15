// const {MakeBaseEmo} = require('@/mysql/miniprogram/makeBaseEmo') ;// 引入数据库文件
const fs = require('fs');

// const baseURL = "/api/";
const { Image , registerFont} = require('canvas');
const openBaseEmoPath = 'make/baseEmo/';
const baseEmoPath = 'public/' + openBaseEmoPath;

const getgif = (img,imgx,imgy,imgw,imgh,ts1,tc1,t1,tx1,ty1,th1,isDoubleText,ts2,tc2,t2,tx2,ty2,th2,emc,emoWH)=>{
  var GIFEncoder = require('gifencoder');
  var Canvas = require('canvas');
  var encoder = new GIFEncoder(emoWH, emoWH);
  encoder.start();
  encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
  encoder.setDelay(500);  // frame delay in ms
  encoder.setQuality(10); // image quality. 10 is default.
  if(emc.slice(-2,-1) === '0'){
    encoder.setTransparent(0xD2B48C);
  }
// use node-canvas
  var canvas = new Canvas.createCanvas(emoWH, emoWH);
  var ctx = canvas.getContext('2d');
  // registerFont('comicsans.ttf', { family: 'Comic Sans' });
// red rectangle
  ctx.fillStyle = emc;
  ctx.fillRect(0, 0, emoWH, emoWH);
  ctx.fill();
  ctx.fillStyle = tc1;
  ctx.drawImage(img, imgx, imgy,imgw,imgh);
  drawText(ctx,ts1,tc1,t1,tx1,ty1,th1);
  if(isDoubleText){
    drawText(ctx,ts2,tc2,t2,tx2,ty2,th2);
  }
  encoder.addFrame(ctx);
  encoder.finish();
  let buf = encoder.out.getData();
  let fname = new Date().getTime() + Math.random() + ".gif";
  let dname = baseEmoPath + getDirectionName();

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
  return openBaseEmoPath + getDirectionName() + '/' + fname;
};

function drawText(canvas, fontSize, textColor, text, textx, texty, isHorizontalText){
  canvas.font = 'bold ' + fontSize + 'px "Heiti SC,黑體\-簡:style=Light"';
  // canvas.font = fontSize + 'px "Adobe Heiti Std"';
  canvas.fillStyle = textColor;
  canvas.strokeStyle = '#ffffff';//文字描边
  if (isHorizontalText) {
    // canvas.fillText(text, textx, texty + fontSize + 3);
    canvas.fillText(text, textx , texty - fontSize*0.4);
    canvas.strokeText(text, textx, texty - fontSize*0.4);
  } else {
    let tx = textx;
    let ty = texty;
    let ts = fontSize;
    let tt = text;
    for (var i = 0; i < tt.length; i++) {
      canvas.fillText(tt[i], tx, ty);
      canvas.strokeText(tt[i], tx, ty);
      ty = ty + ts + 12;
    }
  }
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

module.exports = getgif
