const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const {User} = require('@/mysql/miniprogram/user.js');
const {UserShareEmoComments} = require('@/mysql/miniprogram/userShareEmoComments.js');
const {UserShareEmos} = require('@/mysql/miniprogram/userShareEmos.js');

// 创建用户实体
const ShareEmoCommentReply = sequelize.define('em_shareemocommentreplys', {
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
ShareEmoCommentReply.insertData = async (path, title,des,userid,emUserShareEmoCommentId,emShareEmoCommentReplyId,emUserShareEmoId,toUserid) => {
  await ShareEmoCommentReply.sync({force: false});
  // 表已创建
  return ShareEmoCommentReply.create({
    path: path,
    title: title,
    des:des,
    fromUserid:userid,
    emUserShareEmoCommentId:emUserShareEmoCommentId,
    emShareEmoCommentReplyId:emShareEmoCommentReplyId,
    emUserShareEmoId:emUserShareEmoId,
    toUserid:toUserid
  })
};
/** 根据评论id查找评论回复 */
ShareEmoCommentReply.getReplyByCommentId = async (commentId) => {
    return ShareEmoCommentReply.findAll({order: [['id', 'ASC']],where: {emUserShareEmoCommentId:commentId,status:0},include:[{ // include关键字表示关联查询
        model: User, // 指定关联的model
        as:'toUser' // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
      },{ // include关键字表示关联查询
        model: User, // 指定关联的model
        as:'fromUser' // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
      }]})
};

/** 获取最新评论 */
ShareEmoCommentReply.getNowRecommend = async (emUserShareEmoId,currentPage=1) => {
  let status = 0;
  let pageSize = 5;
  if (!currentPage) {
    currentPage = 1;
  }
  return ShareEmoCommentReply.findAndCountAll({
    order: [['id', 'DESC']],
    include:[User],
    distinct:true,
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {emUserShareEmoId:emUserShareEmoId,status}
  })
};

/** 删除轮播 **/
ShareEmoCommentReply.deleteById = async (id) => {
  let status = 1;
  return ShareEmoCommentReply.update({
    status
  }, {
    where: {id}
  })
};
//是哪一个分享
// UserShareEmos.hasMany(ShareEmoCommentReply);
ShareEmoCommentReply.belongsTo(UserShareEmos, { as: 'emUserShareEmo', foreignKey: 'emUserShareEmoId' });


//是哪个用户发表的
// User.hasMany(ShareEmoCommentReply, { foreignKey: 'fromUserid' });
ShareEmoCommentReply.belongsTo(User, { as: 'toUser', foreignKey: 'toUserid' });
//是评论哪个用户
// User.hasMany(ShareEmoCommentReply, { foreignKey: 'toUserid' });
ShareEmoCommentReply.belongsTo(User, { as: 'fromUser', foreignKey: 'fromUserid' });



//回复了那条评论
// UserShareEmoComments.hasMany(ShareEmoCommentReply);
ShareEmoCommentReply.belongsTo(UserShareEmoComments, { as: 'emUserShareEmoComment', foreignKey: 'emUserShareEmoCommentId' });
//回复了哪条回复
// ShareEmoCommentReply.hasMany(ShareEmoCommentReply);
ShareEmoCommentReply.belongsTo(ShareEmoCommentReply, { as: 'emShareEmoCommentReply', foreignKey: 'emShareEmoCommentReplyId' });

module.exports.ShareEmoCommentReply = ShareEmoCommentReply;
