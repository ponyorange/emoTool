const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
// 创建用户实体
const EmoBaseImgType = sequelize.define('em_emobaseimgtypes', {
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
EmoBaseImgType.insertData = async (title, iconPath) => {
  await EmoBaseImgType.sync({force: false});
  // 表已创建
  return EmoBaseImgType.create({
    title: title,
    iconPath:iconPath
  })
};
/** 查找所有类型**/
EmoBaseImgType.findAllType = async () => {
  return EmoBaseImgType.findAll();
};

/** 修改数据 */
EmoBaseImgType.updateimgType = async  (type)=> {
  return EmoBaseImgType.update({
    title: type.title,
    iconPath:type.iconPath},
    {
    where: {id:type.id}
  })
};

/** 删除数据 */
EmoBaseImgType.deleteType = async  (typeId)=> {
  return EmoBaseImgType.destroy(
    {
      where: {id:typeId}
    })
};

module.exports.EmoBaseImgType = EmoBaseImgType;
