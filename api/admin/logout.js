const {sequelize} = require('@/mysql/utils');
const {Admin} = require('@/mysql/admin/admin') ;// 引入数据库文件
const bcrypt = require('bcrypt');
var request = require('request');//网络请求
// 引入jwt token工具
const JwtUtil = require('@/utils/jwt');

const logout = async (req, res, next) => {
  try{
    res.json(global.toJson(200, '退出成功'));
  }
  catch (e) {
    res.json(global.toJson(500, '未知错误'));
  }
};
module.exports = logout;
