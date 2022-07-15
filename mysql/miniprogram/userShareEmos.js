const {User} = require('@/mysql/miniprogram/user.js');
const {sequelize} = require('../utils');
const Sequelize = require('sequelize');

// 创建用户实体
const UserShareEmos = sequelize.define('em_usershareemos', {
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
  imgCount:{
    type: Sequelize.INTEGER
  },
  pos:{
    type: Sequelize.INTEGER,
  },
  click:{
    type: Sequelize.INTEGER,
  },
  status:{//状态：0发布，1删除
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});

/** 插入数据 */
UserShareEmos.insertData = async (paths, title,des,userid) => {
  await UserShareEmos.sync({force: false});
  // 表已创建
  let ps = JSON.stringify({paths:paths});
  return UserShareEmos.create({
    paths: ps,
    title: title,
    des:des,
    imgCount:paths.length,
    emUserId:userid
  })
};
/** 修改违规标题 */
UserShareEmos.updateTitle = async (id, title) => {
  return UserShareEmos.update({
     title
  }, {
    where: {id}
  })
};
/** 修改违规描述 */
UserShareEmos.updateDes = async (id,des) => {
  return UserShareEmos.update({
    des
  }, {
    where: {id}
  })
};

/** 获取所有数据 */
UserShareEmos.findAllData = async (currentPage) => {
  let pageSize = 10;
  if (!currentPage) {
    currentPage = 1;
  }
  return UserShareEmos.findAndCountAll({
    order: [['id', 'DESC']],
    include:[User],
    distinct:true,
    offset:(currentPage - 1) * pageSize,
    limit:pageSize
  })
};
/** 根据时间排序获取分享 */
UserShareEmos.getNowRecommend = async (currentPage) => {
  let status = 0;
  let pageSize = 10;
  if (!currentPage) {
    currentPage = 1;
  }
  return UserShareEmos.findAndCountAll({
    order: [['id', 'DESC']],
    include:[User],
    distinct:true,
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {status}
    })
};
/** 根据点赞排序获取分享 */
UserShareEmos.getUserShareEmosByLike = async (currentPage) => {
  let status = 0;
  let pageSize = 21;
  if (!currentPage) {
    currentPage = 1;
  }
  let offset = (currentPage - 1) * pageSize;
  return sequelize.query("SELECT eu.*, count( eul.id ) likes FROM `em_usershareemos` eu LEFT JOIN em_usershareemolikes eul ON eul.emUserShareEmoId = eu.id WHERE eu.status = 0 GROUP BY eu.id ORDER BY likes DESC LIMIT "+offset+"," + (offset + 10), { type: sequelize.QueryTypes.SELECT });
};
// UserShareEmos.getUserShareEmosByLike = async (currentPage) => {
//   let status = 0;
//   let pageSize = 10;
//   if (!currentPage) {
//     currentPage = 1;
//   }
//   console.log("is me!"+User);
//   console.log("is me!"+UserShareEmoLikes);
//   let include = [
//     {model:User},
//     {
//       model:UserShareEmoLikes,
//       where: { id: Sequelize.col('userShareEmos.emUserShareEmoId') }
//     },
//     ];
//   return UserShareEmos.findAndCountAll({
//     include:include,
//     offset:(currentPage - 1) * pageSize,
//     limit:pageSize,
//     where: {status},
//     attributes:[
//       [sequelize.fn('SUM', sequelize.col(UserShareEmos.id)),"likeCount"]
//     ],
//     group: UserShareEmos.id,
//     order: [['likeCount', 'DESC']],
//     raw:true,
//     rollup:true
//   });
// };
/** 根据用户id获取推荐 */
UserShareEmos.getRecommendByUserId = async (emUserId,currentPage) => {

  let status = 0;
  let pageSize = 21;
  if (!currentPage) {
    currentPage = 1;
  }
  return UserShareEmos.findAndCountAll({
    order: [['id', 'DESC']],
    include:[User],
    distinct:true,
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {status,emUserId}
  })
};

/** 修改数据 */
UserShareEmos.updateData = async (id,paths, title,des) => {
  return UserShareEmos.update({
    paths, title , des
  }, {
    where: {id}
  })
};
/** id查找 **/
UserShareEmos.findById = async (id) => {
  return UserShareEmos.findAll({where: {id},include:[User]})
};
/** 计算用户分享数 **/
UserShareEmos.countByUserId = async (emUserId) => {
  let status = 0;
  let data = await UserShareEmos.findAndCountAll({
    where: {status,emUserId}
  });
  return data.count;
};


/** 查找所以轮播图 **/
UserShareEmos.findAllImgs = async () => {
  let status = 0;
  return UserShareEmos.findAll({where: {status}})
};

/** 删除轮播 **/
UserShareEmos.deleteById = async (id) => {
  let status = 1;
  return UserShareEmos.update({
    status
  }, {
    where: {id}
  })
};
User.hasMany(UserShareEmos);
UserShareEmos.belongsTo(User);

// UserShareEmos.hasMany(UserShareEmoLikes);
module.exports.UserShareEmos = UserShareEmos;
