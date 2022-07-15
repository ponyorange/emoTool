const {TaoLu} = require('@/mysql/taolu/taolu') ;// 引入数据库文件
const {TaoLuImage} = require('@/mysql/taolu/taoluImage') ;// 引入数据库文件
var request = require('request');//网络请求
var fs = require("fs");
const addLoopImgs = async (req, res, next) => {
  var  getTokenOption = {
    method: 'get',
    url: "https://m.weimaiduo.com/app/index.php?i=100&t=0&v=1.0.4&from=wxapp&c=entry&a=wxapp&do=classlist&m=xz_bq&sign=3e3c0a6f45a18a425c358d6500bd5b25&type=4&r=502368",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  request(getTokenOption, async function (err, r, b) {
    if (err) {
      console.log(err);
    }else {
      let bodyJson = JSON.parse(b);
      // console.log(bodyJson.data.length);
      for (var i = 0; i < bodyJson.data.length; i ++){
        let taolu = bodyJson.data[i];
        // let imageUrl = "https://tu.weimaiduo.com/" +  taolu.imgpath;
        // let dstpath = "./public/images/taolu/" + taolu.imgpath.split('/')[5];
        // console.log(taolu.imgpath.split('/')[5]);
        // request(imageUrl).pipe(fs.createWriteStream(dstpath));
        let title = taolu.name;
        let des = taolu.about;
        let imgpath = "/images/taolu/" + taolu.imgpath.split('/')[5];
        let newTaolu =  await TaoLu.insertData(title,des,imgpath);
        let newTid = newTaolu.id;
        await getTaoLuDetail(taolu.id,newTid);
      }
    }
  });

  res.json(global.toJson(200, '获取成功',"123"));
};

async function getTaoLuDetail(tid,newTid){
  var  getTokenOption = {
    method: 'get',
    url: "https://m.weimaiduo.com/app/index.php?i=100&t=0&v=1.0.4&from=wxapp&c=entry&a=wxapp&do=Group_img&m=xz_bq&sign=24ddbbbcf4b130b6a105a5aa56da9266&id="+tid+"&r=500934\n",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  request(getTokenOption, async function (err, r, b) {
    if (err) {
      console.log(err);
    }else {
      let bodyJson = JSON.parse(b);
      // console.log(bodyJson.data);
      for (var i = 0; i < bodyJson.data.length; i ++){
        let taolu = bodyJson.data[i];
        // let imageUrl = "https://tu.weimaiduo.com/" +  taolu.imgpath;
        // let dstpath = "./public/images/taolu/" + taolu.imgpath.split('/')[5];
        // console.log(taolu.imgpath.split('/')[5]);
        // request(imageUrl).pipe(fs.createWriteStream(dstpath));
        let title = taolu.name;
        let des = taolu.kw;
        let imgpath = "/images/taolu/" + taolu.imgpath.split('/')[5];
        await TaoLuImage.insertData(title,des,imgpath,newTid);
      }
    }
  });
}
module.exports = addLoopImgs;
