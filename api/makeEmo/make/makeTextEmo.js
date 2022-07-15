const magnify = 1.5;//放大倍数
const emoWH = 250 * magnify;
const makeTextEmo = async (req, res, next) => {
  console.log('--------makeTextEmo----------');
  //文字1
  let ts1 = req.body.ts1 * magnify;
  let tc1 = req.body.tc1;
  let t1 = req.body.t1;
  let tx1 = req.body.tx1 * magnify;
  let ty1 = (req.body.ty1 )* magnify + ts1 + 3;
  let th1 = req.body.th1;
  //双行？
  let isDoubleText = req.body.isDoubleText;
  //文字2
  let ts2 = req.body.ts2 * magnify;
  let tc2 = req.body.tc2;
  let t2 = req.body.t2;
  let tx2 = req.body.tx2 * magnify;
  let ty2 = (req.body.ty2 )* magnify + ts2 + 3;
  let th2 = req.body.th2;
  let emc = req.body.emoBgc;
  res.json({
    data: getTextgif(ts1,tc1,t1,tx1,ty1,th1,isDoubleText,ts2,tc2,t2,tx2,ty2,th2,emc),
  });
};

function getTextgif(ts1,tc1,t1,tx1,ty1,th1,isDoubleText,ts2,tc2,t2,tx2,ty2,th2,emc) {
  var GIFEncoder = require('gifencoder');
  var Canvas = require('canvas');
  //算图片宽高
  var emow = 0;
  var emoh = 0;
  var x1 = tx1;
  var x2 = tx2;
  var y1 = ty1;
  var y2 = ty2;
  var type = 0;
  if(!isDoubleText){
    let n = 1;
    for(var i = 0; i < t1.length; i++){
      console.log(t1.charCodeAt(i));
      if(t1.charCodeAt(i) === 10){
        n ++;
      }
    }
    console.log(n);
    emow = emoWH;
    if(th1){
      emoh = n * ts1 + 20;
      y1 = 20 + ts1;
    }else{
      emoh = emoWH;
    }
  }else{
    emow = emoWH;
    emoh = emoWH;
  }
  var encoder = new GIFEncoder(emow, emoh);
  encoder.start();
  encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
  encoder.setDelay(500);  // frame delay in ms
  encoder.setQuality(10); // image quality. 10 is default.
  encoder.setTransparent(0xD2B48C);
// use node-canvas
  var canvas = new Canvas.createCanvas(emow, emoh);
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = emc;
  ctx.fillRect(0, 0, emow, emoh);
  ctx.fill();
  drawText(ctx,ts1,tc1,t1,x1,y1,th1);
  if(isDoubleText){
    drawText(ctx,ts2,tc2,t2,x2,y2,th2);
  }
  encoder.addFrame(ctx);
  encoder.finish();
  var buf = encoder.out.getData();
  return buf;
}


function drawText(canvas, fontSize, textColor, text, textx, texty, isHorizontalText){
  canvas.font = fontSize + 'px "Microsoft YaHei UI"';
  // canvas.font = fontSize + 'px "Adobe Heiti Std"';
  canvas.fillStyle = textColor;
  if (isHorizontalText) {
    // canvas.fillText(text, textx, texty + fontSize + 3);
    canvas.fillText(text, textx , texty - fontSize*0.4);
  } else {
    let tx = textx;
    let ty = texty;
    let ts = fontSize;
    let tt = text;
    for (var i = 0; i < tt.length; i++) {
      canvas.fillText(tt[i], tx, ty);
      ty = ty + ts + 12;
    }
  }
}


module.exports = makeTextEmo;
