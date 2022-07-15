const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const {User} = require('@/mysql/miniprogram/user.js');
var fn = Sequelize.fn;
var col = Sequelize.col;
var where = Sequelize.where;

// 创建用户实体
const MakeBaseEmo = sequelize.define('em_makebaseemos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  path: {
    type: Sequelize.STRING,
    unique: true
  },
});
User.hasMany(MakeBaseEmo, {as: 'baseEmo'});
MakeBaseEmo.belongsTo(User);
/** 插入数据 */
MakeBaseEmo.insertData = async (path, userId) => {
  await MakeBaseEmo.sync({force: false});
  // 表已创建
  return MakeBaseEmo.create({
    path: path,
    emUserId:userId
  })
};
/** 根据用户ID获取 */
MakeBaseEmo.findByUserId = async ( userId) => {
  // 表已创建
  return MakeBaseEmo.findAll({where: {emUserId:userId}})
};
/** 根据用户ID获取前20条数据 */
MakeBaseEmo.findTopByUserId = async ( userId) => {
  // let sqlStr =
  return sequelize.query("select * from `em_makebaseemos` where emUserId ='"+userId+"'order by id desc limit 0,20", { type: sequelize.QueryTypes.SELECT })
};

/** 查询所有用户制作的表情 */
MakeBaseEmo.findAllEmos = function (currentPage) {
  let pageSize = 20;
  if (!currentPage) {
    currentPage = 1;
  }
  return MakeBaseEmo.findAndCountAll({
    order: [['id', 'DESC']],
    include:[User],
    distinct:true,
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
  });
};

/** 查询每个月的数据 */
MakeBaseEmo.countmonthdata = function (sdate) {
  // return MakeBaseEmo.findAll({
  //   attributes: [
  //     [fn('date_format', col('createdAt'), 'YYYYMMDD'), 'date'],
  //     [fn('count', col('*')), 'total'],
  //   ],
  //   group: col('date'),
  //   order: [[col('date'), 'asc']],
  //   where: where(fn('date_format', col('createdAt'), 'YYYYMM'), sdate)
  // })
  Order.findAll({attributes:['name', [sequelize.fn('SUM', sequelize.col('price')), 'sum']],
                 group:'name',
                 having:['COUNT(?)>?', 'name', 1],
                 raw:true})
    .then(function(result){
    console.log(result);
  })
};



module.exports.MakeBaseEmo = MakeBaseEmo;
