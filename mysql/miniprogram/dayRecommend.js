const {sequelize} = require('../utils');
const Sequelize = require('sequelize');

// 创建用户实体
const DayRecommend = sequelize.define('em_dayrecommends', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  paths: {
    type: Sequelize.TEXT
  },
  title:{
    type: Sequelize.STRING
  },
  des:{
    type: Sequelize.STRING
  },
  status:{//状态：0发布，1删除
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});

/** 插入数据 */
DayRecommend.insertData = async (paths, title,des) => {
  await DayRecommend.sync({force: false});
  // 表已创建
  let ps = JSON.stringify({paths:paths});
  return DayRecommend.create({
    paths: ps,
    title: title,
    des:des
  })
};

/** 获取最新推荐 */
DayRecommend.getNowRecommend = async (currentPage=1) => {
  let status = 0;
  let pageSize = 10;
  if (!currentPage) {
    currentPage = 1;
  }
  return DayRecommend.findAndCountAll({
    order: [['id', 'DESC']],
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {status}
  })
};

/** 修改数据 */
DayRecommend.updateData = async (id,paths, title,des) => {
  return DayRecommend.update({
    paths, title , des
  }, {
    where: {id}
  })
};
/** id查找 **/
DayRecommend.findById = async (id) => {
  return DayRecommend.findAll({where: {id}})
};

/** 查找所以轮播图 **/
DayRecommend.findAllImgs = async () => {
  let status = 0;
  return DayRecommend.findAll({where: {status}})
};

/** 删除轮播 **/
DayRecommend.deleteById = async (id) => {
  let status = 1;
  return DayRecommend.update({
    status
  }, {
    where: {id}
  })
};

module.exports.DayRecommend = DayRecommend;
