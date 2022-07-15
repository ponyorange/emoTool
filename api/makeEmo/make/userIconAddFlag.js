const openUserIconAddSdmPath = 'make/userAddSDCap/';
const userIconAddSdmPath = 'public/' + openUserIconAddSdmPath;
const fs = require('fs');
// const baseURL = "/api/";
const { Image , registerFont} = require('canvas');

const UserAddSDCap = async (req, res, next) => {
  //图片
  let imgSrc = req.body.img;
  let sdms = req.body.sdms;
  let flag = req.body.flag;
  //有配件
  if (sdms.length > 0){
    let images = [];
    let len = sdms.length;
    let sus = 0;
    let image = new Image();
    image.onload = function () {
      images.push(image);
      let flagImage = new Image();
      flagImage.onload = function () {
        images.push(flagImage);
        for(let i = 0; i < len; i++){
          let img = new Image();
          let sdm = sdms[i];
          img.onload = function () {
            sdm.img = img;
            images.push(sdm);
            sus += 1;
            if(sus === len){
              let data = userIconAddSdm(images);
              res.json({
                data:data,
              });
            }
          };
          // console.log('public' + sdm.path);
          img.src = 'public' + sdm.path;
        }
      };
      flagImage.src = 'public' + flag;
    };
    image.src = imgSrc;
  } else{
    let images = [];
    let image = new Image();
    image.onload = function () {
      images.push(image);
      let flagImage = new Image();
      flagImage.onload = function () {
        images.push(flagImage);
        let data = userIconAddSdm(images);
        res.json({
          data:data,
        });
      };
      flagImage.src = 'public' + flag;
    };
    image.src = imgSrc;
  }
};

/*绘图方法*/
function drawSdm(canvas,num,img,x,y,w,h,s,sp,cz){
  canvas.save();
  let width = w*s;
  let height = h*s;
  /*原点偏移*/
  canvas.translate(x + width/2, y + height/2);
  /*旋转 (弧度)*/
  canvas.rotate(num*Math.PI/180);
  /*翻转*/
  canvas.scale(sp,cz);
  /*绘制图片*/
  canvas.drawImage(img, -width/2, -height/2, width, height);
  /*旋转回来*/
  // canvas.rotate(-num*Math.PI/180);
  /*偏移回来*/
  // canvas.translate(-(x + width/2),-(y + height/2));
  /*封装canvas操作结束处*/
  canvas.restore();
}
//头像加圣诞帽
function userIconAddSdm(images) {
  // console.log(images);
  let Canvas = require('canvas');
  let canvas = new Canvas.createCanvas(500, 500);
  let ctx = canvas.getContext('2d');
  ctx.drawImage(images[0], 0, 0,500,500);
  ctx.drawImage(images[1], 0, 0,500,500);
  let len = images.length;
  let fname = new Date().getTime() + Math.random() + ".jpeg";
  let dname = userIconAddSdmPath + getDirectionName();
  for(var i = 2; i < len; i++){
    let img = images[i];
    // console.log(img);
    let imgw = img.img.width;
    let imgh = img.img.height;
    let w = 150 ;
    let h = 150 ;
    let x = (img.x - 37.5)*2;
    let y = (img.y - 37.5)*2;
    // console.log(x+'===='+y);
    // let x = (img.x - 37.5)*2;
    // let y = (img.y - 37.5)*2;
    if(imgw > imgh){
      w = img.w * 2 ;
      h = imgh/imgw * w ;
      y = y + (w - h)/2;
    }else{
      h = img.h * 2;
      w = imgw/imgh * h;
      x = x + (h - w)/2;
    }
    x = (1 - img.s)*w / 2 + x;
    y = (1 - img.s)*h / 2 + y;
    // console.log(x+'===='+y);
    drawSdm(ctx,img.r,img.img,x,y,w,h,img.s,img.sp,img.cz);
  }
  fs.exists(dname,function (exists) {
    if(exists){
      let out = fs.createWriteStream(userIconAddSdmPath + getDirectionName() + '/' + fname);
      let stream = canvas.createJPEGStream();
      stream.pipe(out);
      out.on('finish', () =>  console.log('The JPEG file was created.'));
    }else{
      fs.mkdirSync(dname);
      let out = fs.createWriteStream(userIconAddSdmPath + getDirectionName() + '/' + fname);
      let stream = canvas.createJPEGStream();
      stream.pipe(out);
      out.on('finish', () =>  console.log('The JPEG file was created.'));
    }
  });

  return openUserIconAddSdmPath + getDirectionName() + '/' + fname;
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



module.exports = UserAddSDCap;
