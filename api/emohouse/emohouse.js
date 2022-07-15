const {EmoHouseSorts} = require('@/mysql/emohouse/emoHouseSorts') ;// 引入数据库文件
const {PublicEmoHouse} = require('@/mysql/emohouse/publicEmoHouse') ;// 引入数据库文件
var fs = require("fs");
var crypto = require('crypto');
var sizeOf = require('image-size');
//path模块，可以生产相对和绝对路径
var path = require("path");
const getMakeThemm = async (req, res, next) => {
  var pathName = "./emohouseInput";
  fs.readdir(pathName, function(err, files){
    var dirs = [];
    (async function iterator(i){
      if(i === files.length) {
        // console.log(dirs);
        for(var j = 0; j < dirs.length; j++){
          //过滤一下隐藏文件
          if (dirs[j][0] === '.'){
            continue;
          }
          //检测是否有这个分类：
          let oldSortData = await EmoHouseSorts.findByTitle(dirs[j]);
          let sortId = 1;
          if (oldSortData.length > 0){//有老的分类
            sortId = oldSortData[0].id;
          } else{//没有老得分类
            //没有分类就添加分类
            console.log(dirs[j]);
            let sortData = await EmoHouseSorts.insertData(dirs[j]);
            sortId = sortData.id;
          }
          getFileName(pathName + '/' + dirs[j],sortId);
          delDir(pathName + '/' + dirs[j]);
        }
        return ;
      }
      fs.stat(path.join(pathName, files[i]), function(err, data){
        if(data.isDirectory()){
          dirs.push(files[i]);
        }
        iterator(i+1);
      });
    })(0);
  });
  res.json(global.toJson(200, 'emohouse调用成功',{data:"emohouse调用成功"}))
};

function getFileName(pathName,sortId){
  fs.readdir(pathName, function(err, files){
    var dirs = [];
    (async function iterator(i){
      if(i === files.length) {
        // console.log(dirs);
        for(var j = 0; j < dirs.length; j++){
          //过滤一下是不是图片
          if (dirs[j][0] === '.'){
            fs.unlinkSync(pathName + '/'+ dirs[j]);
            continue;
          }

          let len = dirs[j].split('.').length;
          let fileType = dirs[j].split('.')[len - 1];
          // if (fileType != 'jpg'||'png'||'gif'||'jpeg'){
          //   continue;
          // }
          //获取标题
          let title = dirs[j].split('.')[0];
          // console.log(title);
          //获取图片旧路径 pathName + '/'+files[i]
          let oldPath = pathName + '/'+ dirs[j];
          //获取图片新路径

          let fname = 'eh' + new Date().getTime() + Math.random() + '.' + fileType;
          let newPath = './public/images/emohouse/' + fname;
          let openPath = 'images/emohouse/' + fname;
          if (j === 0){
            //更新分类icon
            await EmoHouseSorts.updateiconpath(sortId,openPath);
          }
          //获取md5
          //读取一个Buffer
          var buffer = fs.readFileSync(oldPath);
          var fsHash = crypto.createHash('md5');
          fsHash.update(buffer);
          var md5 = fsHash.digest('hex');
          // console.log("文件的MD5是：%s", md5);
          //获取图片宽高
          var dimensions = sizeOf(oldPath);

          let md5CheckData = await PublicEmoHouse.findByMd5(md5);
          if (md5CheckData.length > 0){
            console.log("已经有了这张图片");
            //删除文件
            fs.unlinkSync(oldPath);
          } else{
            //插入数据
            await PublicEmoHouse.insertData(title,openPath,md5,dimensions.width,dimensions.height,sortId);
            //移动文件
            try {
              fs.renameSync(oldPath, newPath);
              ctx.body = no_data_success('文件上传成功',j)
            } catch (error) {
              console.log(error, 'error')
            }
          }
        }

        return ;
      }
      fs.stat(path.join(pathName, files[i]), function(err, data){
        if(data.isFile()){
          dirs.push(files[i]);
        }
        iterator(i+1);
      });
    })(0);
  });
}

function delDir(p) {
  // 读取文件夹中所有文件及文件夹
  var list = fs.readdirSync(p);
  if (list.length > 0){
    return;
  }
  // 删除空文件夹
  fs.rmdirSync(p)
}
module.exports = getMakeThemm;

