const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const {ChristmasHatType} = require('@/mysql/miniprogram/christmasHatType.js');
// 创建用户实体
const ChristmasHat = sequelize.define('em_christmashats', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
  },
  path: {
    type: Sequelize.STRING,
  },
});

/** 插入数据 */
ChristmasHat.insertData = async (path, title,typeId) => {
  await ChristmasHat.sync({force: false});
  // 表已创建
  return ChristmasHat.create({
    path: path,
    title:title,
    emChristmasHatTypeId:typeId
  })
};
/** 查找所有圣诞帽**/
ChristmasHat.findAllHat = async () => {
  return ChristmasHat.findAll();
};

/** 根据ID查找所有圣诞帽**/
ChristmasHat.findAllHatByType = async (typeId) => {
  return ChristmasHat.findAll({where:{emChristmasHatTypeId:typeId}});
};

/** 删除 */
ChristmasHat.deleteImg = async  (imgId)=> {
  return ChristmasHat.destroy(
    {
      where: {id:imgId}
    })
};

ChristmasHatType.hasMany(ChristmasHat,{ as: 'emChristmasHatType', foreignKey: 'emChristmasHatTypeId' });
module.exports.ChristmasHat = ChristmasHat;
