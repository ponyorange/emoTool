const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const {User} = require('@/mysql/miniprogram/user.js');
const {GifRooms} = require('@/mysql/miniprogram/gifRooms.js');
// 创建点赞实体
const GifRoomShares = sequelize.define('em_gifroomshares', {
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
GifRoomShares.insertData = async (userid,emGifRoomId,makeUserId) => {
  await GifRoomShares.sync({force: false});
  // 表已创建
  return GifRoomShares.create({
    emUserId:userid,
    emGifRoomId:emGifRoomId,
    makeUserId:makeUserId
  })
};

/** 计算用户喜欢数 **/
GifRoomShares.countLikeByUserId = async (emUserId) => {
  let status = 0;
  let data = await GifRoomShares.findAndCountAll({
    where: {status,emUserId}
  });
  return data.count;
};
/** 计算用户被喜欢数 **/
GifRoomShares.countLikedByUserId = async (makeUserId) => {
  let status = 0;
  let data = await GifRoomShares.findAndCountAll({
    where: {status,makeUserId}
  });
  return data.count;
};

/** 获取用户喜欢的分享 */
GifRoomShares.getUserLikeEmos = async (emUserId,currentPage=1) => {
  // let status = 0;
  // let pageSize = 10;
  // if (!currentPage) {
  //   currentPage = 1;
  // }
  // return GifRoomShares.findAndCountAll({
  //   order: [['id', 'DESC']],
  //   include:[{ // include关键字表示关联查询
  //     model: GifRooms, // 指定关联的model
  //     as:'em_gifRoom' // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
  //   }],
  //   distinct:true,
  //   offset:(currentPage - 1) * pageSize,
  //   limit:pageSize,
  //   where: {emUserId:emUserId,status}
  // })
  return GifRoomShares.findAll({
    order: [['id', 'DESC']],
    include:[{ // include关键字表示关联查询
      model: GifRooms, // 指定关联的model
      as:'em_gifRoom' // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
    }],
    where: {emUserId:emUserId}
  })
};

//获取点赞数量
GifRoomShares.isLike = async (emUserId,emGifRoomId) =>{
  let data = await GifRoomShares.findAndCountAll({
    where: {emGifRoomId:emGifRoomId,emUserId:emUserId}
  });
  return data.count > 0;
};
//获取是否点赞
GifRoomShares.getLikeCount = async (emGifRoomId) =>{
  let data = await GifRoomShares.findAndCountAll({
    where: {emGifRoomId:emGifRoomId}
  });
  return data.count;
};

/** 取消点赞 **/
GifRoomShares.deleteById = async (emUserId,emGifRoomId) => {
  return GifRoomShares.destroy(
    {
      where: {
        emUserId:emUserId,
        emGifRoomId:emGifRoomId
      }
    })
};

//分享被删除时删除点赞喜欢记录
GifRoomShares.deleteByEmoId = async (emGifRoomId) => {
  return GifRoomShares.destroy(
    {
      where: {
        emGifRoomId:emGifRoomId
      }
    })
};

User.hasMany(GifRoomShares);
GifRoomShares.belongsTo(User);
// GifRooms.hasMany(GifRoomShares);
GifRoomShares.belongsTo(GifRooms, { as: 'em_gifRoom', foreignKey: 'emGifRoomId' });
// console.log('userShareEmoLike', GifRoomShares)
module.exports.GifRoomShares = GifRoomShares;
