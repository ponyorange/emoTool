var omggif = require('omggif');
const Canvas = require('canvas');
const { drawText } = require('./textUtils');
const fs = require('fs');
const { Image , registerFont} = require('canvas');
const openBaseEmoPath = 'make/baseGif/';
const baseEmoPath = 'public/' + openBaseEmoPath;


class ImageGenerator {
  constructor (textInfo) {
    this.DEFAULT_FONT_SIZE = 20
    this.DEFAULT_FONT_FAMILY = "'Microsoft YaHei'"
    this.DEFAULT_FILL_STYLE = 'white'
    this.DEFAULT_STROKE_STYLE = 'black'

    this._textInfo = textInfo
  }

  get isGenerating () {
    return false
  }

  // Range: [0, 1]
  get generatingProgress () {
    return 0
  }

  async generate () {
    return ''
  }

  _createCanvasContext (width, height) {
    var Canvas = require('canvas');
    var canvas = new Canvas.createCanvas(width, height);
    let ctx = canvas.getContext('2d')
    let fontFamily = this.DEFAULT_FONT_FAMILY ? `${this.DEFAULT_FONT_FAMILY}, sans-serif` : 'sans-serif'
    ctx.font = `${this.DEFAULT_FONT_SIZE}px ${fontFamily}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillStyle = this.DEFAULT_FILL_STYLE
    if (this.DEFAULT_STROKE_STYLE) {
      ctx.strokeStyle = this.DEFAULT_STROKE_STYLE
    }
    ctx.lineWidth = 3
    ctx.lineJoin = 'round'
    return [canvas, ctx]
  }
}

class GifGenerator extends ImageGenerator {
  constructor (textInfo, imageUrl) {
    super(textInfo)
    let result=fs.readFileSync(imageUrl);
    let imageData = new Uint8Array(result);
    this._gifReader = new omggif.GifReader(imageData)

    // -1 means not generating
    this._generatingProgress = -1
  }

  get isGenerating () {
    return this._generatingProgress >= 0
  }

  // Range: [0, 1]
  get generatingProgress () {
    return this._generatingProgress >= 0 ? this._generatingProgress : 0
  }

  async generate () {
    if (this.isGenerating) {
      return null
    }
    this._generatingProgress = 0

    // Get image size
    let frame0Info = this._gifReader.frameInfo(0)
    let [width, height] = [frame0Info.width, frame0Info.height]

    // Init canvas
    let [, ctx] = this._createCanvasContext(width, height)

    // Init GIF encoder
    var GIFEncoder = require('gifencoder');
    var gif = new GIFEncoder(width, height);
    gif.start();
    gif.setRepeat(0);   // 0 for repeat, -1 for no-repeat
    // gif.setDelay(this._gifReader.frameInfo(0).delay);  // frame delay in ms
    gif.setQuality(16); // image quality. 10 is default.
    // console.log("总秒数：",this._gifReader.numFrames())
    // console.log("总秒数：",this._gifReader.frameInfo(0).delay)
    // console.log("总秒数：",this._gifReader.numFrames() * this._gifReader.frameInfo(0).delay)
    // Image data, RGBA RGBA ...
    let pixelBuffer = new Uint8ClampedArray(width * height * 4)
    let time = 0
    let textIndex = 0
    for (let i = 0; i < this._gifReader.numFrames(); i++) {
      // Decode frame and draw it to canvas
      this._gifReader.decodeAndBlitFrameRGBA(i, pixelBuffer)
      // console.log(pixelBuffer)
      let imageData = Canvas.createImageData(pixelBuffer,width, height)
      ctx.putImageData(imageData, 0, 0)
      // Add text
      let frameInfo = this._gifReader.frameInfo(i)
      if (textIndex < this._textInfo.length) {
        let textInfo = this._textInfo[textIndex]
        if (textInfo.startTime <= time && time < textInfo.endTime) {
          let text = textInfo.text || textInfo.default
          ctx.strokeText(text, width / 2, height - 5, width)
          ctx.fillText(text, width / 2, height - 5, width)
        }
        time += frameInfo.delay / 100
        if (time >= textInfo.endTime) {
          textIndex++
        }
      }

      // Add frame
      gif.addFrame(ctx, {
        copy: true,
        delay: frameInfo.delay,
        dispose: frameInfo.disposal
      })
    }

    gif.finish();
    let buf = gif.out.getData();
    let fname = new Date().getTime() + Math.random() + ".gif";
    let dname = baseEmoPath + getDirectionName();
    // console.log("最后了，存文件");
    fs.exists(dname,function (exists) {
      if(exists){
        // console.log("存在")
        fs.writeFile(dname +'/'+ fname, buf, function (err) {
          console.log(err);
        });
      }else{
        // console.log("不存在")
        fs.mkdirSync(dname);
        fs.writeFile(dname +'/'+ fname, buf, function (err) {
          // console.log("错误")
          console.log(err);
        });
      }
    });
    return '/' + openBaseEmoPath + getDirectionName() + '/' + fname;
  }

  async getImgAtIndex (i) {
    // Get image size
    let frame0Info = this._gifReader.frameInfo(0)
    let [width, height] = [frame0Info.width, frame0Info.height]

    // Init canvas
    let [, ctx] = this._createCanvasContext(width, height)

    // Init GIF encoder
    var GIFEncoder = require('gifencoder');
    var gif = new GIFEncoder(width, height);
    gif.start();
    gif.setRepeat(0);   // 0 for repeat, -1 for no-repeat
    // gif.setDelay(500);  // frame delay in ms
    gif.setQuality(16); // image quality. 10 is default.

    // Image data, RGBA RGBA ...
    let pixelBuffer = new Uint8ClampedArray(width * height * 4)

    // Decode frame and draw it to canvas
    this._gifReader.decodeAndBlitFrameRGBA(i, pixelBuffer)
    // console.log(pixelBuffer)
    let imageData = Canvas.createImageData(pixelBuffer,width, height)
    ctx.putImageData(imageData, 0, 0)
    // Add text
    let frameInfo = this._gifReader.frameInfo(i)
    // Add frame
    gif.addFrame(ctx, {
      copy: true,
      delay: frameInfo.delay * 10,
      dispose: frameInfo.disposal
    })

    gif.finish();
    let buf = gif.out.getData();
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
    return '/' + openBaseEmoPath + getDirectionName() + '/' + fname;
  }

  async generateAddText (texts) {
    if (this.isGenerating) {
      return null
    }
    this._generatingProgress = 0;

    // Get image size
    let frame0Info = this._gifReader.frameInfo(0);
    let [width, height] = [frame0Info.width, frame0Info.height];
    //缩放比例
    let scaling = width / 200;

    // Init canvas
    let [, ctx] = this._createCanvasContext(width, height);

    // Init GIF encoder
    var GIFEncoder = require('gifencoder');
    var gif = new GIFEncoder(width, height);
    gif.start();
    gif.setRepeat(0);   // 0 for repeat, -1 for no-repeat
    // gif.setDelay(this._gifReader.frameInfo(0).delay);  // frame delay in ms
    gif.setQuality(16); // image quality. 10 is default.
    let pixelBuffer = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < this._gifReader.numFrames(); i++) {
      // Decode frame and draw it to canvas
      this._gifReader.decodeAndBlitFrameRGBA(i, pixelBuffer);
      // console.log(pixelBuffer)
      let imageData = Canvas.createImageData(pixelBuffer,width, height);
      ctx.putImageData(imageData, 0, 0);
      // Add text
      let frameInfo = this._gifReader.frameInfo(i);
      for(let j = 0; j < texts.length; j ++) {//添加多组字
        let tx = texts[j].tx * scaling;
        let ty = texts[j].ty * scaling;
        let text = texts[j].text;
        let fontFamily = this.DEFAULT_FONT_FAMILY ? `${this.DEFAULT_FONT_FAMILY}, sans-serif` : 'sans-serif';
        ctx.font = `${texts[j].fontSize * scaling}px ${fontFamily}`;
        ctx.fillStyle = texts[j].fColor;
        ctx.strokeStyle = texts[j].sColor;

        let textX = text.length * this.DEFAULT_FONT_SIZE * 0.5 + tx;
        let textY = this.DEFAULT_FONT_SIZE + 5 + ty;

        ctx.strokeText(text, textX, textY, width)
        ctx.fillText(text, textX, textY, width)
      }
      // Add frame
      gif.addFrame(ctx, {
        copy: true,
        delay: frameInfo.delay,
        dispose: frameInfo.disposal
      })
    }
    gif.finish();
    let buf = gif.out.getData();
    let fname = new Date().getTime() + Math.random() + ".gif";
    let dname = baseEmoPath + getDirectionName();
    // console.log("最后了，存文件");
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
    return '/' + openBaseEmoPath + getDirectionName() + '/' + fname;
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

module.exports = GifGenerator
