const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const {User} = require('@/mysql/miniprogram/user.js');
const {UserShareEmos} = require('@/mysql/miniprogram/userShareEmos.js');

// 创建用户实体
const UserShareEmoComments = sequelize.define('em_usershareemocomments', {
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
UserShareEmoComments.insertData = async (path, title,des,userid,shareEmoId) => {
  await UserShareEmoComments.sync({force: false});
  // 表已创建
  return UserShareEmoComments.create({
    path: path,
    title: title,
    des:des,
    emUserId:userid,
    emUserShareEmoId:shareEmoId
  })
};


/** 获取最新评论 */
UserShareEmoComments.getNowRecommend = async (emUserShareEmoId,currentPage=1) => {
  let status = 0;
  let pageSize = 25;
  if (!currentPage) {
    currentPage = 1;
  }
  return UserShareEmoComments.findAndCountAll({
      order: [['id', 'DESC']],
      include:[User],
      distinct:true,
      offset:(currentPage - 1) * pageSize,
      limit:pageSize,
      where: {emUserShareEmoId:emUserShareEmoId,status}
    })
};

/** 删除轮播 **/
UserShareEmoComments.deleteById = async (id) => {
  let status = 1;
  return UserShareEmoComments.update({
    status
  }, {
    where: {id}
  })
};
User.hasMany(UserShareEmoComments);
UserShareEmoComments.belongsTo(User);

// UserShareEmos.hasMany(UserShareEmoComments);
UserShareEmoComments.belongsTo(UserShareEmos, { as: 'emUserShareEmo', foreignKey: 'emUserShareEmoId' });

module.exports.UserShareEmoComments = UserShareEmoComments;
