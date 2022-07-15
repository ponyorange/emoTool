/* 签到记录表 */
const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const {User} = require('@/mysql/miniprogram/user.js');
// 创建用户实体
const SignRecord = sequelize.define('em_signRecords', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  day:{//日期，精确到日
    type: Sequelize.STRING
  },
});
//
/** 插入数据 */
SignRecord.insertData = async (emUserId, day) => {
  await SignRecord.sync({force: false});
  // 表已创建
  return SignRecord.create({
    emUserId,
    day
  })
};
SignRecord.findByIdAndDay = async (emUserId, day) => {
  return SignRecord.findAll({where: {
    emUserId, day
  }})
};


User.hasMany(SignRecord);
SignRecord.belongsTo(User);
module.exports.SignRecord = SignRecord;
