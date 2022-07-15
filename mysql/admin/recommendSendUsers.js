const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const {User} = require('@/mysql/miniprogram/user.js');
// 创建用户实体
const RecommendSendUsers = sequelize.define('em_recommendsendusers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  openid:{
    type: Sequelize.STRING
  },
  formid:{
    type: Sequelize.STRING
  },
  status:{//状态：0发布，1删除
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});

/** 插入数据 */
RecommendSendUsers.insertData = async (openid, formid,userid) => {
  await RecommendSendUsers.sync({force: false});
  return RecommendSendUsers.create({
    openid,
    formid,
    emUserId:userid,
  })
};

/** 查询所有用户 */
RecommendSendUsers.findAllData = function () {
  return RecommendSendUsers.findAndCountAll({
    order: [['id', 'DESC']],
    include:[User],
    distinct:true,
  });
};


/** id查找 **/
RecommendSendUsers.findById = async (id) => {
  return RecommendSendUsers.findAll({where: {id},include:[User]})
};
/** 用户IDid查找 **/
RecommendSendUsers.findByUserId = async (emUserId) => {
  return RecommendSendUsers.findAll({where: {emUserId}})
};

/** 删除轮播 **/
RecommendSendUsers.deleteByOpenId = async (openid) => {
  return RecommendSendUsers.destroy(
    {
      where: {openid}
    })
};
User.hasMany(RecommendSendUsers);
RecommendSendUsers.belongsTo(User);
module.exports.RecommendSendUsers = RecommendSendUsers;
