/* 用户任务完成表 */
const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const {User} = require('@/mysql/miniprogram/user.js');
// 创建用户实体
const UserTaskRecord = sequelize.define('em_userTaskRecords', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {//0。签到、1。分享表情、2。制作表情、3。分享抖图、4。订阅推荐
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  day:{//日期，精确到日
    type: Sequelize.STRING
  },
});
//
/** 插入数据 */
UserTaskRecord.insertData = async (emUserId,type, day) => {
  await UserTaskRecord.sync({force: false});
  // 表已创建
  return UserTaskRecord.create({
    emUserId,type, day
  })
};
UserTaskRecord.findByDayStr = async (emUserId,day) => {
  return UserTaskRecord.findAll({where: {
      emUserId,day
    }})
};
User.hasMany(UserTaskRecord);
UserTaskRecord.belongsTo(User);
module.exports.UserTaskRecord = UserTaskRecord;

