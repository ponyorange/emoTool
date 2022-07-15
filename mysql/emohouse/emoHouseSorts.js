const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
// 创建用户实体
const EmoHouseSorts = sequelize.define('em_emoHouseSorts', {
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
  dex:{
    type: Sequelize.STRING,
  },
  pos:{
    type: Sequelize.INTEGER,
  },
  status:{//状态：0发布，1删除
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});
/** 插入数据 */
EmoHouseSorts.insertData = async (title) => {
  await EmoHouseSorts.sync({force: false});
  // 表已创建
  return EmoHouseSorts.create({
    title: title
  })
};
/** 根据名称查询 */
EmoHouseSorts.findByTitle = async (title) => {
  return EmoHouseSorts.findAll({where: {title}})
};
/** 修改数据 */
EmoHouseSorts.updateiconpath = async  (id,iconPath)=> {
  return EmoHouseSorts.update({
      iconPath
    },
    {
      where: {id}
    })
};

/** 删除数据 */
EmoHouseSorts.deleteType = async  (typeId)=> {
  return EmoHouseSorts.destroy(
    {
      where: {id:typeId}
    })
};
/** 分页获取数据 */
EmoHouseSorts.fillEmoHouseSorts = async  (currentPage)=> {
  let status = 0;
  let pageSize = 30;
  if (!currentPage) {
    currentPage = 1;
  }
  return EmoHouseSorts.findAndCountAll({
    order: [['id', 'DESC']],
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {status}
  })
};

module.exports.EmoHouseSorts = EmoHouseSorts;
