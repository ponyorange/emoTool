const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// 创建用户实体
const Admin = sequelize.define('em_admins', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  avatarImage: {
    type: Sequelize.STRING
  },
});

// Admin.sync({force: true});

/** 插入新用户数据（注册） */
Admin.insertData = async (name, password) => {
  await Admin.sync({force: false});
  // 表已创建
  return Admin.create({
    name: name,
    password: password
  })
};
/** 查询是否已经有该用户 */
Admin.findName = function (name) {
  return Admin.findAll({
    where: {
      name: name
    }
  })
};

Admin.findById = async (id) => {
  return Admin.findAll({where: {id}})
};

module.exports.Admin = Admin;
