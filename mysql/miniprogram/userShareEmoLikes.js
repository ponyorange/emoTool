const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const {User} = require('@/mysql/miniprogram/user.js');
const {UserShareEmos} = require('@/mysql/miniprogram/userShareEmos.js');
// 创建点赞实体
const UserShareEmoLikes = sequelize.define('em_usershareemolikes', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  makeUserId:{
    type: Sequelize.INTEGER,
  },
  status:{//状态：0发布，1删除
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});

/** 插入数据 */
UserShareEmoLikes.insertData = async (userid,shareEmoId,makeUserId) => {
  await UserShareEmoLikes.sync({force: false});
  // 表已创建
  return UserShareEmoLikes.create({
    emUserId:userid,
    emUserShareEmoId:shareEmoId,
    makeUserId:makeUserId
  })
};

/** 计算用户喜欢数 **/
UserShareEmoLikes.countLikeByUserId = async (emUserId) => {
  let status = 0;
  let data = await UserShareEmoLikes.findAndCountAll({
    where: {status,emUserId}
  });
  return data.count;
};
/** 计算用户被喜欢数 **/
UserShareEmoLikes.countLikedByUserId = async (makeUserId) => {
  let status = 0;
  let data = await UserShareEmoLikes.findAndCountAll({
    where: {status,makeUserId}
  });
  return data.count;
};

/** 获取用户喜欢的分享 */
UserShareEmoLikes.getUserLikeEmos = async (emUserId,currentPage=1) => {
  let status = 0;
  let pageSize = 10;
  if (!currentPage) {
    currentPage = 1;
  }
  return UserShareEmoLikes.findAndCountAll({
    order: [['id', 'DESC']],
    include:[{ // include关键字表示关联查询
      model: UserShareEmos, // 指定关联的model
      as:'em_userShareEmo' // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
    }],
    distinct:true,
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {emUserId:emUserId,status}
  })
};

//获取点赞数量
UserShareEmoLikes.isLike = async (emUserId,emUserShareEmoId) =>{
  let data = await UserShareEmoLikes.findAndCountAll({
    where: {emUserShareEmoId:emUserShareEmoId,emUserId:emUserId}
  });
  return data.count > 0;
};
//获取是否点赞
UserShareEmoLikes.getLikeCount = async (emUserShareEmoId) =>{
  let data = await UserShareEmoLikes.findAndCountAll({
    where: {emUserShareEmoId:emUserShareEmoId}
  });
  return data.count;
};

/** 取消点赞 **/
UserShareEmoLikes.deleteById = async (emUserId,emUserShareEmoId) => {
  return UserShareEmoLikes.destroy(
    {
      where: {
        emUserId:emUserId,
        emUserShareEmoId:emUserShareEmoId
      }
    })
};

//分享被删除时删除点赞喜欢记录
UserShareEmoLikes.deleteByEmoId = async (emUserShareEmoId) => {
  return UserShareEmoLikes.destroy(
    {
      where: {
        emUserShareEmoId:emUserShareEmoId
      }
    })
};

User.hasMany(UserShareEmoLikes);
UserShareEmoLikes.belongsTo(User);
// UserShareEmos.hasMany(UserShareEmoLikes);
UserShareEmoLikes.belongsTo(UserShareEmos, { as: 'em_userShareEmo', foreignKey: 'emUserShareEmoId' });
// console.log('userShareEmoLike', UserShareEmoLikes)
module.exports.UserShareEmoLikes = UserShareEmoLikes;
