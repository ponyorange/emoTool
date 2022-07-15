const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// 创建用户实体
const User = sequelize.define('em_users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  loginType: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  showWXInfo: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  scroe: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  openid: {
    type: Sequelize.STRING,
  },
  unionid: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  usericon:{
    type: Sequelize.STRING,
  },
  usersign:{
    type: Sequelize.STRING
  },
  wxname: {
    type: Sequelize.STRING,
  },
  wxicon:{
    type: Sequelize.STRING,
  },
});
// User.sync({force: true});

/** 插入新用户数据（注册） */
User.insertData = async (openid, unionid,loginType) => {
  await User.sync({force: false});
  // 表已创建
  let users = await User.findAll();
  let userCount = users.length + 1;
  let username = "小西柚" + userCount + "号";
  let usericon = "/images/baseImg/userDefaultIcon.jpg";
  let usersign = "每一天都很精彩";
  return User.create({
     openid,
     unionid,
     username,
     usericon,
     usersign,
     loginType
  })
};
/** 插入新用户数据（系统添加） */
User.insertSystemUser = async (username, usericon) => {
  await User.sync({force: false});
  let users = await User.findAll();
  let userCount = users[users.length - 1].id;
  return User.create({
    openid: userCount,
    unionid: userCount,
    username,
    usericon,
    usersign:"10001",
    loginType:"2"
  })
};
/** 查询是否已经有该用户 */
User.findName = function (openid) {
  return User.findAll({
    where: {
      openid: openid
    }
  })
};
/** 根据id查询 */
User.findById = async (id) => {
  return User.findAll({where: {id}})
};
/** 根据openid查询 */
User.findByOpenId = async (openid) => {
  return User.findAll({where: {openid}})
};
/** 根据id删除用户 */
User.removeUser = async (id) => {
  return User.destroy({where: {id}})
};

/** 更新微信头像和微信名称*/
User.updateWXInfoById = async (id,wxname,wxicon) => {
  return User.update({
    wxname, wxicon
  }, {
    where: {id}
  })
};
/** 更新用户资料*/
User.updateUserById = async (id,username,usericon,showWXInfo) => {
  return User.update({
    username, usericon,showWXInfo
  }, {
    where: {id}
  })
};
User.updateUsersignById = async (id,usersign) => {
  return User.update({
    usersign
  }, {
    where: {id}
  })
};
/** 查询所有用户 */
User.findAllUser = function (currentPage,loginType) {
  let pageSize = 10;
  if (!currentPage) {
    currentPage = 1;
  }
  return User.findAndCountAll({
    order: [['id', 'DESC']],
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {loginType}
  });
};

/** 更改用户积分 */
User.updateUserScroeById = async (id,newScroe) => {
  return User.update({
    scroe:newScroe
  }, {
    where: {id}
  })
};

module.exports.User = User;
