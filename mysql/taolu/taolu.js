const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
// 创建用户实体
const TaoLu = sequelize.define('em_taoLus', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
  },
  imgpath: {
    type: Sequelize.STRING,
  },
  des:{
    type: Sequelize.STRING,
  },
  pos:{
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  click:{
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  status:{//状态：0发布，1删除
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});

/** 插入数据 */
TaoLu.insertData = async (title,des,imgpath) => {
  await TaoLu.sync({force: false});
  // 表已创建
  return TaoLu.create({
    title,des,imgpath
  })
};
/** 查找所有套路 **/
TaoLu.findAllTaolus = async () => {
  let status = 0;
  return TaoLu.findAll({where: {status}})
};

/** 删除 */
TaoLu.deleteImg = async  (imgId)=> {
  return TaoLu.destroy(
    {
      where: {id:imgId}
    })
};

module.exports.TaoLu = TaoLu;
