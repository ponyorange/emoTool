const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
// 创建用户实体
const TaoLuImage = sequelize.define('em_taoLuImages', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  taoluId:{
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
  imgpath: {
    type: Sequelize.STRING,
  },
  des:{
    type: Sequelize.STRING,
  },
  pos:{
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  click:{
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  status:{//状态：0发布，1删除
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});

/** 插入数据 */
TaoLuImage.insertData = async (title,des,imgpath,taoluId) => {
  await TaoLuImage.sync({force: false});
  // 表已创建
  return TaoLuImage.create({
    title,des,imgpath,taoluId
  })
};

/** 根据id查询**/
TaoLuImage.gettaoluByid = async (taoluId) => {
  console.log("===---===");
  console.log(taoluId);
  return TaoLuImage.findAll({where:{taoluId}});
};

/** 删除 */
TaoLuImage.deleteImg = async  (imgId)=> {
  return TaoLuImage.destroy(
    {
      where: {id:imgId}
    })
};

module.exports.TaoLuImage = TaoLuImage;
