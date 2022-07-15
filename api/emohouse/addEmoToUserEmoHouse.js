const {PublicEmoHouse} = require('@/mysql/emohouse/publicEmoHouse') ;// 引入数据库文件
const {UserEmoHouse} = require('@/mysql/emohouse/userEmoHouse') ;// 引入数据库文件
const {EmoHouseSorts} = require('@/mysql/emohouse/emoHouseSorts') ;// 引入数据库文件
var fs = require("fs");
var crypto = require('crypto');
var sizeOf = require('image-size');
//path模块，可以生产相对和绝对路径
var path = require("path");
const addLoopImgs = async (req, res, next) => {
  //有id和没id
  let pid = req.body.pid;
  let imgpath = req.body.imgpath;
  let uid = req.body.uid;
  let sortTitle = req.body.sortTitle;
  let emoTitle = req.body.emoTitle;
  if (!sortTitle){
    sortTitle = "好友在用";
  }
  if (!emoTitle){
    emoTitle = '';
  }
  let data = '';
  if (pid && pid > 0){
    data = await UserEmoHouse.insertData(imgpath,uid,pid);
  } else{
    //检测是否有这个分类：
    let oldSortData = await EmoHouseSorts.findByTitle(sortTitle);
    let sortId = 1;
    //处理分类
    if (oldSortData.length > 0){//有老的分类
      sortId = oldSortData[0].id;
    } else{//没有老得分类
      //没有分类就添加分类
      let sortData = await EmoHouseSorts.insertData(sortTitle);
      sortId = sortData.id;
      //添加iconpath
      await EmoHouseSorts.updateiconpath(sortId,imgpath);
    }
  //  处理表情
    //获取md5
    let oldPath = './public' + imgpath;
    //读取一个Buffer
    var buffer = fs.readFileSync(oldPath);
    var fsHash = crypto.createHash('md5');
    fsHash.update(buffer);
    var md5 = fsHash.digest('hex');
    console.log("文件的MD5是：%s", md5);
    //获取图片宽高
    var dimensions = sizeOf(oldPath);
    console.log(dimensions);
    let md5CheckData = await PublicEmoHouse.findByMd5(md5);

    if (md5CheckData.length > 0){
      console.log("已经有了这张图片");
      console.log((uid));
      data = await UserEmoHouse.insertData(imgpath,uid,md5CheckData[0].id);
    } else{
      //插入数据
      console.log("没有这张图片");
      data = await PublicEmoHouse.insertData(emoTitle,imgpath,md5,dimensions.width,dimensions.height,sortId);
      await UserEmoHouse.insertData(imgpath,uid,data.id);
    }
  }
  res.json(global.toJson(200, '添加成功',data))
};
module.exports = addLoopImgs;
