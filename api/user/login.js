const {sequelize} = require('@/mysql/utils');
const {User} = require('@/mysql/miniprogram/user') ;// 引入数据库文件
const {UserInviteRecords} = require('@/mysql/miniprogram/userInviteRecords') ;// 引入数据库文件
const {ScroeRecord} = require('@/mysql/miniprogram/scroeRecord') ;// 引入数据库文件
const bcrypt = require('bcrypt');
var request = require('request');//网络请求
// 引入jwt token工具
const JwtUtil = require('@/utils/jwt');

const login = async (req, res, next) => {
  let code = req.body.code;
  let type = req.body.loginType;
  let inviteId = req.body.inviteId;
  console.log("===inviteId===",inviteId);
  let scroe = 100;
  //判断是微信小程序还是QQ小程序
  if (type === 0){//QQ小程序
    var  qqLotinOptions = {
      method: 'get',
      url: "https://api.q.qq.com/sns/jscode2session?appid=xxx&secret=xxx&js_code="+code+"&grant_type=authorization_code",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    request(qqLotinOptions, async function (err, r, body) {
      if (err) {
        console.log(err);
        res.json(global.toJson(401, err))
      }else {
        let bodyJson = JSON.parse(body);

        if(bodyJson.openid){
          const value = await User.findName(bodyJson.openid);
          // 将用户id传入并生成token
          let jwt = new JwtUtil(bodyJson.openid);
          let token = jwt.generateToken();
          if (value && value.length === 0) {
            try {
              const endData = await User.insertData(bodyJson.openid, "qq",0);
              if (endData){
                let user = await User.findByOpenId(bodyJson.openid);
                let userinfodata = {token:token,userinfo:user[0]};
                if (inviteId){
                  console.log("有人邀请我了");
                  //获取当前日期
                  let date = new Date();
                  let year = date.getFullYear();
                  let month = date.getMonth() + 1;
                  let day = date.getDate();
                  if (month < 10){
                    month = "" + "0" + month;
                  }
                  if (day < 10){
                    day = "" + "0" + day;
                  }
                  let dateStr = ""+year+month+day;

                  const userScroeData = await User.findById(inviteId);
                  let newScroe = userScroeData[0].scroe + scroe;
                  User.updateUserScroeById(inviteId,newScroe);
                  UserInviteRecords.invite(inviteId,user[0].id,scroe);
                  ScroeRecord.sign(inviteId,0,"邀请新用户","邀请新用户获得积分",scroe,newScroe,dateStr);
                } else {
                  console.log("没有人邀请我")
                }
                res.json(global.toJson(0, '注册且登录成功！',userinfodata));//注册并登录成功
              }
            } catch (err) {
              res.send('插入失败，失败原因：' + err);
            }
          } else {
            let user = await User.findByOpenId(bodyJson.openid);
            let userinfodata = {token:token,userinfo:user[0]};
            res.json(global.toJson(0, '登录成功',userinfodata));//登录成功
          }
        }else{
          res.json(global.toJson(500, '非法登录'))
        }
      }
    });
  } else{//微信小程序
    var  options = {
      method: 'get',
      url: "https://api.weixin.qq.com/sns/jscode2session?appid=wx2c8c2bc83e9d6c91&secret=3ef7721fde8d59d92918e1be6174ea23&js_code="+code+"&grant_type=authorization_code",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    request(options, async function (err, r, body) {
      if (err) {
        console.log(err);
        res.json(global.toJson(401, err))
      }else {
        let bodyJson = JSON.parse(body);

        if(bodyJson.openid){
          const value = await User.findName(bodyJson.openid);
          // 将用户id传入并生成token
          let jwt = new JwtUtil(bodyJson.openid);
          let token = jwt.generateToken();
          if (value && value.length === 0) {
            try {
              const endData = await User.insertData(bodyJson.openid, bodyJson.unionid,1);
              if (endData){
                let user = await User.findByOpenId(bodyJson.openid);
                let userinfodata = {token:token,userinfo:user[0]};
                if (inviteId){
                  console.log("有人邀请我了");
                  //获取当前日期
                  let date = new Date();
                  let year = date.getFullYear();
                  let month = date.getMonth() + 1;
                  let day = date.getDate();
                  if (month < 10){
                    month = "" + "0" + month;
                  }
                  if (day < 10){
                    day = "" + "0" + day;
                  }
                  let dateStr = ""+year+month+day;

                  const userScroeData = await User.findById(inviteId);
                  let newScroe = userScroeData[0].scroe + scroe;
                  User.updateUserScroeById(inviteId,newScroe);
                  UserInviteRecords.invite(inviteId,user[0].id,scroe);
                  ScroeRecord.sign(inviteId,0,"邀请新用户","邀请新用户获得积分",scroe,newScroe,dateStr);
                } else {
                  console.log("没有人邀请我")
                }
                res.json(global.toJson(0, '注册且登录成功！',userinfodata));//注册并登录成功
              }
            } catch (err) {
              res.send('插入失败，失败原因：' + err);
            }
          } else {
            let user = await User.findByOpenId(bodyJson.openid);
            let userinfodata = {token:token,userinfo:user[0]};
            res.json(global.toJson(0, '登录成功',userinfodata));//登录成功
          }
        }else{
          res.json(global.toJson(500, '非法登录'))
        }
      }
    });
  }

};


module.exports = login;
