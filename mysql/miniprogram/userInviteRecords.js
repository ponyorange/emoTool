/* 用户邀请记录表 */
const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const {User} = require('@/mysql/miniprogram/user.js');
// 创建用户实体
const UserInviteRecords = sequelize.define('em_userinviterecords', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  inviteUserId: {//邀请者id
    type: Sequelize.INTEGER
  },
  scroe:{//获得积分
    type: Sequelize.INTEGER
  },
});
//
/** 插入数据 */
UserInviteRecords.invite = async (inviteUserId,emUserId,scroe) => {
  await UserInviteRecords.sync({force: false});
  // 表已创建
  return UserInviteRecords.create({
    inviteUserId,emUserId,scroe
  })
};
//
UserInviteRecords.findInviteCountByUserid = async (inviteUserId) => {
  return UserInviteRecords.findAll({where: {
      inviteUserId
    }})
};


User.hasMany(UserInviteRecords);
UserInviteRecords.belongsTo(User);
module.exports.UserInviteRecords = UserInviteRecords;
