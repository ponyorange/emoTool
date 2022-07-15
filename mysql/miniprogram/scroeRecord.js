/* 积分记录表 */
const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const {User} = require('@/mysql/miniprogram/user.js');
// 创建用户实体
const ScroeRecord = sequelize.define('em_scroeRecords', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {//0。增加；1。减少
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  title:{//变动标题，如签到
    type: Sequelize.STRING
  },
  des:{//变动描述，如每日签到
    type: Sequelize.STRING
  },
  changeScroe:{//变动的分数
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  leftScroe: {//剩余积分
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  status:{//状态：0存在，1删除
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
ScroeRecord.sign = async (emUserId,type,title,des,changeScroe,leftScroe,day) => {
  await ScroeRecord.sync({force: false});
  // 表已创建
  return ScroeRecord.create({
    emUserId,type,title,des,changeScroe,leftScroe,day
  })
};

ScroeRecord.findByDayStr = async (emUserId,day) => {
  return ScroeRecord.findAll({where: {
      emUserId,day,
      type:0,
    }})
};


User.hasMany(ScroeRecord);
ScroeRecord.belongsTo(User);
module.exports.ScroeRecord = ScroeRecord;
