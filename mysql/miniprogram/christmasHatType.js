const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
// 创建用户实体
const ChristmasHatType = sequelize.define('em_christmashattypes', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
  },
  iconPath: {
    type: Sequelize.STRING,
  },
});
/** 插入数据 */
ChristmasHatType.insertData = async (title, iconPath) => {
  await ChristmasHatType.sync({force: false});
  // 表已创建
  return ChristmasHatType.create({
    title: title,
    iconPath:iconPath
  })
};
/** 查找所有类型**/
ChristmasHatType.findAllType = async () => {
  return ChristmasHatType.findAll();
};
/** 修改数据 */
ChristmasHatType.updateimgType = async  (type)=> {
  return ChristmasHatType.update({
      title: type.title,
      iconPath:type.iconPath},
    {
      where: {id:type.id}
    })
};

/** 删除数据 */
ChristmasHatType.deleteType = async  (typeId)=> {
  return ChristmasHatType.destroy(
    {
      where: {id:typeId}
    })
};

module.exports.ChristmasHatType = ChristmasHatType;
