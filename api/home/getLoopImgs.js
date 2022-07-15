const {sequelize} = require('@/mysql/utils');
const {LoopImgs} = require('@/mysql/miniprogram/loopImgs') ;// 引入数据库文件
// const bcrypt = require('bcrypt');
// var request = require('request');//网络请求
// 引入jwt token工具
// const JwtUtil = require('@/utils/jwt');

const getLoopImgs = async (req, res, next) => {
  let data = await LoopImgs.findAllImgs();
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = getLoopImgs;
