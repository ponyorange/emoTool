const {sequelize} = require('@/mysql/utils');
const {LoopImgs} = require('@/mysql/miniprogram/loopImgs') ;// 引入数据库文件
// const bcrypt = require('bcrypt');
// var request = require('request');//网络请求
// 引入jwt token工具
// const JwtUtil = require('@/utils/jwt');

const addLoopImgs = async (req, res, next) => {

  console.log(req.body);
  let data = req.body.banner;
  if (data.id){
    console.log("修改");
    const endData = await LoopImgs.updateData(data.id,data.path, data.title,data.des,data.type,data.link);
    if (endData){
      res.json(global.toJson(200, '修改成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  } else{
    console.log("添加");
    const endData = await LoopImgs.insertData(data.path, data.title,data.des,data.type,data.link);
    if (endData){
      res.json(global.toJson(200, '添加成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  }
};
module.exports = addLoopImgs;

