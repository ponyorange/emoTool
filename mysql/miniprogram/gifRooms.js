const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const {User} = require('@/mysql/miniprogram/user.js');
// console.log("=-=-=-=-=");
// console.log(User);
// 创建用户实体
const GifRooms = sequelize.define('em_gifrooms', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  path: {//图片路径
    type: Sequelize.STRING,
  },
  cover:{//封面图片
    type: Sequelize.STRING,
  },
  from:{//来源
    type: Sequelize.STRING
  },
  title:{
    type: Sequelize.STRING
  },
  des:{
    type: Sequelize.STRING
  },
  denyReson:{//审核不通过理由
    type: Sequelize.STRING
  },
  status:{//状态：0待审核，1审核通过，2审核不通过，3下架，4删除
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});

/** 插入数据 */
GifRooms.insertData = async (path, cover, from, title, des, denyReson, status, emUserId) => {
  await GifRooms.sync({force: false});
  // 表已创建
  return GifRooms.create({
    path,
    denyReson,
    from,
    title,
    des,
    cover,
    status,
    emUserId
  })
};

/** 获取用户的数据数据 */
GifRooms.findUserShare = async (currentPage,userId) => {
  // let pageSize = 10;
  // if (!currentPage) {
  //   currentPage = 1;
  // }
  // console.log(currentPage,"=====",userId);
  // return GifRooms.findAndCountAll({
  //   order: [['id', 'DESC']],
  //   // distinct:true,
  //   offset:(currentPage - 1) * pageSize,
  //   limit:pageSize,
  //   where: {emUserId:userId,status:{[Op.ne]:4}}
  // })

  return GifRooms.findAll({
    order: [['id', 'DESC']],
    where: {emUserId:userId,status:{[Op.ne]:4}}
  })
};

/** 获取用户的数据数据 */
GifRooms.findUserData = async (currentPage,minId,userId) => {
  let status = 1;
  let pageSize = 10;
  if (!currentPage) {
    currentPage = 1;
  }
  return GifRooms.findAndCountAll({
    // order: [['id', 'DESC']],
    include:[{ // include关键字表示关联查询
      model: User, // 指定关联的model
      as:'em_user' // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
    }],
    distinct:true,
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {status:status,id:{[Op.gte]: minId},emUserId:{[Op.ne]:userId}}
  })
};

/** 分页分页查找数据 */
GifRooms.findAllData = async (currentPage,status) => {
  let pageSize = 10;
  if (!currentPage) {
    currentPage = 1;
  }

  if (+status === -1){
    console.log("===",status);
    return GifRooms.findAndCountAll({
      order: [['id', 'DESC']],
      include:[{ // include关键字表示关联查询
        model: User, // 指定关联的model
        as:'em_user' // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
      }],
      distinct:true,
      offset:(currentPage - 1) * pageSize,
      limit:pageSize
    })
  } else{
    return GifRooms.findAndCountAll({
      order: [['id', 'DESC']],
      include:[{ // include关键字表示关联查询
        model: User, // 指定关联的model
        as:'em_user' // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
      }],
      distinct:true,
      offset:(currentPage - 1) * pageSize,
      limit:pageSize,
      where:{status}
    })
  }
};

/** 根据id查询 */
GifRooms.findById = async (id) => {
  return GifRooms.findAll({
    include:[{ // include关键字表示关联查询
      model: User, // 指定关联的model
      as:'em_user' // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
    }],
    where:{id}
  })
};

/** 修改数据 */
GifRooms.updateData = async (id, path, cover, from, title, des, denyReson, status, emUserId) => {
  await GifRooms.sync({force: false});
  // 表已创建
  return GifRooms.update({
    path,
    denyReson,
    from,
    title,
    des,
    cover,
    status,
    emUserId
  }, {
    where: {id}
  })
};

/** 修改状态 */
GifRooms.updateStatus = async (id, status) => {
  await GifRooms.sync({force: false});
  // 表已创建
  return GifRooms.update({
    status
  }, {
    where: {id}
  })
};

/** 删除数据 */
GifRooms.removeById = async (id) => {
  await GifRooms.sync({force: false});
  // 表已创建
  return GifRooms.update({
    status:3
  }, {
    where: {id}
  })
};

// User.hasMany(GifRooms);
GifRooms.belongsTo(User, { as: 'em_user', foreignKey: 'emUserId' });

module.exports.GifRooms = GifRooms;
