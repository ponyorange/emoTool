const {User} = require('@/mysql/miniprogram/user.js');
const {PublicEmoHouse} = require('@/mysql/emohouse/publicEmoHouse.js');
const {sequelize} = require('../utils');
const Sequelize = require('sequelize');

// 创建用户实体
const UserEmoHouse = sequelize.define('em_userEmoHouses', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pos:{
    type: Sequelize.INTEGER,
  },
  imgpath:{
    type: Sequelize.STRING,
  }
});

/** 插入数据 */
UserEmoHouse.insertData = async (imgpath, emUserId,emPublicEmoHouseId) => {
  await UserEmoHouse.sync({force: false});
  // 表已创建
  return UserEmoHouse.create({
    imgpath, emUserId,emPublicEmoHouseId
  })
};
UserEmoHouse.findByUidEid = async (imgpath,emUserId) =>{
  return UserEmoHouse.findAll({where: {imgpath,emUserId}})
};

UserEmoHouse.findByUid = async (currentPage,emUserId) =>{
  let pageSize = 36;
  if (!currentPage) {
    currentPage = 1;
  }
  return UserEmoHouse.findAndCountAll({
    order: [['id', 'DESC']],
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {emUserId}
  })
};

UserEmoHouse.removeByUidEid = async (imgpath,emUserId) =>{
  return UserEmoHouse.destroy({where: {imgpath,emUserId}})
};


User.hasMany(UserEmoHouse);
UserEmoHouse.belongsTo(User);
PublicEmoHouse.hasMany(UserEmoHouse);
UserEmoHouse.belongsTo(PublicEmoHouse);

// UserEmoHouse.hasMany(UserShareEmoLikes);
module.exports.UserEmoHouse = UserEmoHouse;
