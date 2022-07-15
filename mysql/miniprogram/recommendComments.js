const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const {User} = require('@/mysql/miniprogram/user.js');
const {DayRecommend} = require('@/mysql/miniprogram/dayRecommend.js');

// 创建用户实体
const RecommendComments = sequelize.define('em_recommendcomments', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  path: {
    type: Sequelize.STRING
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
RecommendComments.insertData = async (path, title,des,userid,emDayRecommendId) => {
  await RecommendComments.sync({force: false});
  // 表已创建
  return RecommendComments.create({
    path: path,
    title: title,
    des:des,
    emUserId:userid,
    emDayRecommendId:emDayRecommendId
  })
};

RecommendComments.updateComment = async (id, title) => {
  return RecommendComments.update({
    title
  }, {
    where: {id}
  })
};

/** 获取最新评论 */
RecommendComments.getNowRecommend = async (emDayRecommendId,currentPage=1) => {
  let status = 0;
  let pageSize = 5;
  if (!currentPage) {
    currentPage = 1;
  }
  return RecommendComments.findAndCountAll({
    order: [['id', 'DESC']],
    include:[User],
    distinct:true,
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {emDayRecommendId,status}
  })
};

/** 修改数据 */
RecommendComments.updateData = async (id,paths, title,des) => {
  return RecommendComments.update({
    paths, title , des
  }, {
    where: {id}
  })
};
/** id查找 **/
RecommendComments.findById = async (id) => {
  return RecommendComments.findAll({where: {id},include:[User]})
};

/** 查找所以轮播图 **/
RecommendComments.findAllImgs = async () => {
  let status = 0;
  return RecommendComments.findAll({where: {status}})
};

/** 删除轮播 **/
RecommendComments.deleteById = async (id) => {
  let status = 1;
  return RecommendComments.update({
    status
  }, {
    where: {id}
  })
};
User.hasMany(RecommendComments);
RecommendComments.belongsTo(User);
// DayRecommend.hasMany(RecommendComments);
RecommendComments.belongsTo(DayRecommend,{ as: 'emDayRecommend', foreignKey: 'emDayRecommendId' });

module.exports.RecommendComments = RecommendComments;
