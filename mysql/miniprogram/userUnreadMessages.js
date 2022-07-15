const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const {User} = require('@/mysql/miniprogram/user.js');
const {UserShareEmos} = require('@/mysql/miniprogram/userShareEmos.js');
const {UserShareEmoComments} = require('@/mysql/miniprogram/userShareEmoComments.js');
// 创建用户实体
const UserUnreadMessages = sequelize.define('em_userunreadmessages', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {//消息类型 0:评论表情分享，1：喜欢表情分享 2:回复评论
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  forId:{//消息来源id
    type: Sequelize.STRING
  },
  forUserId:{//内容制作用户id
    type: Sequelize.STRING
  },
  connectId:{//用户制造内容的id
    type: Sequelize.STRING
  },
  emoCommentId:{//对应评论的id
    type: Sequelize.STRING
  },
  status:{//状态：0未读，1已读
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});
// /** 插入数据 */
UserUnreadMessages.insertData = async (type, forId,forUserId,emUserId,connectId,emUserShareEmoCommentId) => {
  await UserUnreadMessages.sync({force: false});
  return UserUnreadMessages.create({
    type,
    forId,
    forUserId,
    emUserId,
    connectId,
    emoCommentId:emUserShareEmoCommentId
  })
};


/** 获取未读消息 */
UserUnreadMessages.getUnReadMessage = async (forUserId,currentPage) => {
  let status = 0;
  let pageSize = 99;
  if (!currentPage) {
    currentPage = 1;
  }
  return UserUnreadMessages.findAndCountAll({
    order: [['id', 'DESC']],
    include:[User,{
      as:"em_userShareEmo",
      model:UserShareEmos,
      key:"forId"

    },{
      as:"em_usershareemocomments",
      model:UserShareEmoComments,
      key:"emoCommentId"

    }],
    distinct:true,
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {status,forUserId}
  })
};
/** 获取历史消息 */
UserUnreadMessages.getHistoryMessage = async (forUserId,currentPage) => {
  let status = 1;
  let pageSize = 10;
  if (!currentPage) {
    currentPage = 1;
  }
  return UserUnreadMessages.findAndCountAll({
    order: [['id', 'DESC']],
    include:[User,{
      as:"em_userShareEmo",
      model:UserShareEmos,
      key:"forId"

    },{
      as:"em_usershareemocomments",
      model:UserShareEmoComments,
      key:"emoCommentId"

    }],
    distinct:true,
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {status,forUserId}
  })
};


/** 读消息 **/
UserUnreadMessages.readAllMessage = async (forUserId) => {
  let status = 1;
  return UserUnreadMessages.update({
    status
  }, {
    where: {forUserId}
  })
};
//关联用户
User.hasMany(UserUnreadMessages);
UserUnreadMessages.belongsTo(User);
//关联评论
UserUnreadMessages.belongsTo(UserShareEmoComments, { as: 'em_usershareemocomments', foreignKey: 'emoCommentId' });
//关联分享
UserUnreadMessages.belongsTo(UserShareEmos, { as: 'em_userShareEmo', foreignKey: 'forId' });
//关联回复

module.exports.UserUnreadMessages = UserUnreadMessages;

