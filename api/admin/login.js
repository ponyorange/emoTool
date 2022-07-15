const {sequelize} = require('@/mysql/utils');
const {Admin} = require('@/mysql/admin/admin') ;// 引入数据库文件
const bcrypt = require('bcrypt');
var request = require('request');//网络请求
// 引入jwt token工具
const JwtUtil = require('@/utils/jwt');

const login = async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log(username);
  console.log(password);
  try{
    const admin = await Admin.findName(username);
    if (!admin.length) {
      res.json(global.toJson(401, '用户名不存在，请检查'));
      return undefined;
    }

    // 匹配密码是否相等
    console.log(admin[0].password);
    if (await bcrypt.compare(password, admin[0].password)) {
      let jwt = new JwtUtil(username);
      let token = jwt.generateToken();
      res.json(global.toJson(200, '登录成功',token));
    } else {
      res.json(global.toJson(401, '密码错误'));
    }
  }
  catch (e) {
    res.json(global.toJson(500, '未知错误'));
  }
};
module.exports = login;
