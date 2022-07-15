const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
// 创建用户实体
const LoopImgs = sequelize.define('em_loopimgs', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  path: {
    type: Sequelize.STRING,
    unique: true
  },
  title:{
    type: Sequelize.STRING
  },
  des:{
    type: Sequelize.STRING
  },
  type:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  link:{
    type: Sequelize.STRING,
  },
  status:{//状态：0发布，1删除
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});

/** 插入数据 */
LoopImgs.insertData = async (path, title,des,type,link) => {
  await LoopImgs.sync({force: false});
  // 表已创建
  return LoopImgs.create({
    path: path,
    title: title,
    des:des,
    type:type,
    link:link
  })
};
/** 修改数据 */
LoopImgs.updateData = async (id,path, title,des,type,link) => {
  return LoopImgs.update({
    path, title , des , type , link
  }, {
    where: {id}
  })
};
/** id查找 **/
LoopImgs.findById = async (id) => {
  return LoopImgs.findAll({where: {id}})
};

/** 查找所以轮播图 **/
LoopImgs.findAllImgs = async () => {
  let status = 0;
  return LoopImgs.findAll({where: {status}})
};

/** 删除轮播 **/
LoopImgs.deleteById = async (id) => {
  let status = 1;
  return LoopImgs.update({
    status
  }, {
    where: {id}
  })
};

module.exports.LoopImgs = LoopImgs;
