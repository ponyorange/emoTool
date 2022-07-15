const Sequelize = require('sequelize');
// 连接mysql
const sequelize = new Sequelize('seeyouemotion', 'root', '123456', {
  host: '127.0.0.1',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
  },
  timezone: '+08:00' //东八时区

});
// 测试数据库是否成功连接
sequelize
  .authenticate()
  .then(() => {
    console.log('数据库已经正常连接');
    //初始化数据库
    const {mysqlinit} = require('@/mysql/mysqlinit');
    mysqlinit.init();
  })
  .catch(err => {
    console.error('连接mysql,失败原因如下:', err)
  });

module.exports.sequelize = sequelize;
