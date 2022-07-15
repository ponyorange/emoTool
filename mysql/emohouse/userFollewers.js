const {User} = require('@/mysql/miniprogram/user.js');
const {sequelize} = require('../utils');
const Sequelize = require('sequelize');

// 创建用户实体
const UserFollewers = sequelize.define('em_userFollewers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  followedUserId:{
    type: Sequelize.STRING,
  },
  ishufen:{//0未互关，1互关
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

/** 插入数据 */
UserFollewers.insertData = async (followedUserId, emUserId,ishufen) => {
  await UserFollewers.sync({force: false});
  // 表已创建
  return UserFollewers.create({
    followedUserId, emUserId,ishufen
  })
};
UserFollewers.findIsFollowed = async (followedUserId,emUserId) =>{
  return UserFollewers.findAll({where: {followedUserId,emUserId}})
};
UserFollewers.updateIshufen = async (id,ishufen) =>{
  return UserFollewers.update({
      ishufen
    },
    {
      where: {id}
    })
};
//获取粉丝列表
UserFollewers.findByUid = async (currentPage,emUserId) =>{
  let pageSize = 36;
  if (!currentPage) {
    currentPage = 1;
  }
  return UserFollewers.findAndCountAll({
    order: [['id', 'DESC']],
    include:[{
      as:"em_followedUserUser",
      model:User,
      key:"followedUserId"

    }],
    distinct:true,
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {emUserId}
  })
};
//获取关注列表
UserFollewers.findByfollowUid = async (currentPage,followedUserId) =>{
  let pageSize = 36;
  if (!currentPage) {
    currentPage = 1;
  }
  return UserFollewers.findAndCountAll({
    order: [['id', 'DESC']],
    include:[User],
    distinct:true,
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {followedUserId}
  })
};

UserFollewers.unfollow = async (followedUserId,emUserId) =>{
  return UserFollewers.destroy({where: {followedUserId,emUserId}})
};

/** 计算用户关注数 **/
UserFollewers.countuserFollow = async (followedUserId) => {
  let data = await UserFollewers.findAndCountAll({
    where: {followedUserId}
  });
  return data.count;
};
/** 计算用户被关注数 **/
UserFollewers.countuserFollowed = async (emUserId) => {
  let data = await UserFollewers.findAndCountAll({
    where: {emUserId}
  });
  return data.count;
};

User.hasMany(UserFollewers);
UserFollewers.belongsTo(User);
//关联关注用户
UserFollewers.belongsTo(User, { as: 'em_followedUserUser', foreignKey: 'followedUserId' });
module.exports.UserFollewers = UserFollewers;
