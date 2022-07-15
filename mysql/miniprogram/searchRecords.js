const {User} = require('@/mysql/miniprogram/user.js');
const {sequelize} = require('../utils');
const Sequelize = require('sequelize');

// 创建用户实体
const SearchRecords = sequelize.define('em_searchRecords', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  keyword:{
    type: Sequelize.STRING,
  },
  keywordType:{//0自己输入的，1搜索记录，2热词
    type: Sequelize.INTEGER,
  }
});

/** 插入数据 */
SearchRecords.insertData = async (keyword, keywordType ,emUserId) => {
  await SearchRecords.sync({force: false});
  // 表已创建
  return SearchRecords.create({
    keyword, keywordType ,emUserId
  })
};

User.hasMany(SearchRecords);
SearchRecords.belongsTo(User);

module.exports.SearchRecords = SearchRecords;
