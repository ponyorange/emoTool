const {sequelize} = require('../utils');
const Sequelize = require('sequelize');

const {User} = require('@/mysql/miniprogram/user.js');
// 创建用户实体
const UserGifRoomMarks = sequelize.define('em_gifroommarks', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  markId: {//用户浏览到了哪个gif图
    type: Sequelize.STRING,
  },
  status:{//状态：0没有看完，1看完了
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});

/** 插入数据 */
UserGifRoomMarks.insertData = async ( status, markId, emUserId) => {
  await UserGifRoomMarks.sync({force: false});
  // 表已创建
  return UserGifRoomMarks.create({
    markId,
    status,
    emUserId
  })
};

/** 修改数据 */
UserGifRoomMarks.updateMark = async ( status, markId, emUserId) => {
  await UserGifRoomMarks.sync({force: false});
  // 表已创建
  return UserGifRoomMarks.update({
    markId,
    status
  },{where: {emUserId}})
};

/** 获取用户的数据数据 */
UserGifRoomMarks.findUserMark = async (emUserId) => {
  return UserGifRoomMarks.findAll({where: {emUserId}})
};

// User.hasMany(UserGifRoomMarks);
UserGifRoomMarks.belongsTo(User, { as: 'em_user', foreignKey: 'emUserId' });

module.exports.UserGifRoomMarks = UserGifRoomMarks;
