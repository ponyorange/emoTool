const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const {EmoHouseSorts} = require('@/mysql/emohouse/emoHouseSorts.js');
const Op = Sequelize.Op;
// 创建用户实体
const PublicEmoHouse = sequelize.define('em_publicEmoHouses', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
  },
  path: {
    type: Sequelize.STRING,
  },
  md5:{
    type: Sequelize.STRING,
  },
  des:{
    type: Sequelize.STRING,
  },
  width:{
    type: Sequelize.INTEGER,
  },
  height:{
    type: Sequelize.INTEGER,
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
PublicEmoHouse.insertData = async (title,path,md5,width,height,emEmoHouseSortsId) => {
  await PublicEmoHouse.sync({force: false});
  // 表已创建
  return PublicEmoHouse.create({
    title,path,md5,width,height,emEmoHouseSortsId
  })
};
/** 根据id删除**/
PublicEmoHouse.removeByPid = async (id) => {
  return PublicEmoHouse.update({
    status:1
  }, {
    where: {id}
  });
};
/** 根据md5查询**/
PublicEmoHouse.findByMd5 = async (md5) => {
  return PublicEmoHouse.findAll({where:{md5}});
};

/** 根据id查询**/
PublicEmoHouse.findByemEmoHouseSortsId = async (emEmoHouseSortsId) => {
  return PublicEmoHouse.findAll({where:{emEmoHouseSortsId}});
};
/** 根据id查询**/
PublicEmoHouse.findBySortsIdPage = async (currentPage,emEmoHouseSortsId) => {
  let status = 0;
  let pageSize = 36;
  if (!currentPage) {
    currentPage = 1;
  }
  return PublicEmoHouse.findAndCountAll({
    order: [['click', 'DESC']],
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {status,emEmoHouseSortsId}
  })
};
/** 管理用户上传的表情**/
PublicEmoHouse.adminGetUserUploadEmoHouse = async (currentPage,type) => {
  let emEmoHouseSortsId = 129;
  let pageSize = 36;
  if (!currentPage) {
    currentPage = 1;
  }
  if(!type){
    type = 0;
  }
  if(type == 0){
    return PublicEmoHouse.findAndCountAll({
      order: [['createAt', 'DESC']],
      offset:(currentPage - 1) * pageSize,
      limit:pageSize,
      where: {emEmoHouseSortsId}
    })
  }else{
    return PublicEmoHouse.findAndCountAll({
      order: [['click', 'DESC']],
      offset:(currentPage - 1) * pageSize,
      limit:pageSize,
      where: {emEmoHouseSortsId}
    })
  }
};
/** 根据关键字查询**/
PublicEmoHouse.findByKeywordPage = async (currentPage,keyword) => {
  let status = 0;
  let pageSize = 36;
  if (!currentPage) {
    currentPage = 1;
  }
  return PublicEmoHouse.findAndCountAll({
    order: [['click', 'DESC']],
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {
      title: {
        [Op.like]: '%'+keyword+'%'
      },
      status:status
    },
  })
};

/** 根据id排序获取分享 */
PublicEmoHouse.fillPublicEmohouse = async (currentPage) => {
  let status = 0;
  let pageSize = 36;
  if (!currentPage) {
    currentPage = 1;
  }
  return PublicEmoHouse.findAndCountAll({
    order: [['click', 'DESC']],
    offset:(currentPage - 1) * pageSize,
    limit:pageSize,
    where: {status}
  })
};
//获取相关推荐，获取36个推荐
PublicEmoHouse.getemolinks= async (emoid,currentPage) => {
  if (emoid){//增加click
    let emo = await PublicEmoHouse.findAll({where: {id:emoid}});
    let click = emo[0].click;
    await PublicEmoHouse.update({
      click:click + 1
    }, {
      where: {id:emoid}
    });
  }
  let status = 0;
  let pageSize = 36;
  if (!currentPage ){
    currentPage = 1;
  }
  let countdata = await PublicEmoHouse.findAndCountAll();
  let count = countdata.count;
  let offset = (currentPage - 1) * pageSize;
  if (emoid && emoid < count - 136){//如果有表情id，就获取id后面100个
    // console.log("emoid");
    offset = +emoid + 100;
  } else{//如果没有，就获取最后36个//或者是给个随机数。
    // console.log('随机');
    offset = randomNum(1,count - 36);
  }
  return PublicEmoHouse.findAndCountAll({
    // order: [['id', 'DESC']],
    offset:offset,
    limit:pageSize,
    where: {status}
  })
};

function randomNum(minNum,maxNum){
  switch(arguments.length){
    case 1:
      return parseInt(Math.random()*minNum+1,10);
      break;
    case 2:
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
      break;
    default:
      return 0;
      break;
  }
}
EmoHouseSorts.hasMany(PublicEmoHouse,{ as: 'emEmoHouseSorts', foreignKey: 'emEmoHouseSortsId' });
module.exports.PublicEmoHouse = PublicEmoHouse;
