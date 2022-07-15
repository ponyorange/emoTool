const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const {User} = require('@/mysql/miniprogram/user.js');
const {UserShareEmos} = require('@/mysql/miniprogram/userShareEmos.js');
// 创建用户实体
const ShareEmoReports = sequelize.define('em_shareemoreports', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: Sequelize.INTEGER
  }
});

// Admin.sync({force: true});

/** 插入 */
ShareEmoReports.insertData = async (type,emUserId,emUserShareEmoId) => {
  await ShareEmoReports.sync({force: false});
  // 表已创建
  return ShareEmoReports.create({
    type,emUserId,emUserShareEmoId
  })
};
/** 查询是否已经有该用户 */
ShareEmoReports.findName = function (name) {
  return ShareEmoReports.findAll({
    where: {
      name: name
    }
  })
};

ShareEmoReports.findById = async (id) => {
  return ShareEmoReports.findAll({where: {id}})
};

User.hasMany(ShareEmoReports);
ShareEmoReports.belongsTo(User);
UserShareEmos.hasMany(ShareEmoReports);
ShareEmoReports.belongsTo(UserShareEmos);
module.exports.ShareEmoReports = ShareEmoReports;
