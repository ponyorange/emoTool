const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
const {EmoBaseImgType} = require('@/mysql/miniprogram/emoBaseImgType.js');
// 创建用户实体
const EmoBaseImg = sequelize.define('em_emobaseimgs', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  path: {
    type: Sequelize.STRING,
  },
  position:{
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  type:{//0首页展示，1分类展示
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  status:{//状态：0发布，1删除
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});

EmoBaseImgType.hasMany(EmoBaseImg,{ as: 'emEmoBaseImgType', foreignKey: 'emEmoBaseImgTypeId' });

/** 插入数据 */
EmoBaseImg.insertData = async (path, position,type,emEmoBaseImgTypeId) => {
  await EmoBaseImg.sync({force: false});
  // 表已创建
  return EmoBaseImg.create({
    path,
    type,
    position,
    emEmoBaseImgTypeId
  })
};

/** 获取制作表情首页基本图片 */
EmoBaseImg.findMakeBaseImgs = async () => {
  let status = 0;
  let type = 0;
  return EmoBaseImg.findAll({where: {status,type}})
};

/** 根据类型获取 */
EmoBaseImg.findMakeBaseImgsByTypeId = async (emEmoBaseImgTypeId) => {
  let status = 0;
  // let type = 0;
  // return EmoBaseImg.findAll({where: {status,type,emEmoBaseImgTypeId}})
  return EmoBaseImg.findAll({where: {status,emEmoBaseImgTypeId}})
};

/** 修改数据 */
EmoBaseImg.updateMakeBaseImgs = async  (img)=> {
  if (img.id){
    return EmoBaseImg.update(img, {
      where: {id:img.id}
    })
  } else{
    return EmoBaseImg.create({
      path:img.path,
      type:0,
      position:img.position,
    })
  }
};

/** 删除 */
EmoBaseImg.deleteImg = async  (imgId)=> {
  return EmoBaseImg.destroy(
    {
      where: {id:imgId}
    })
};

module.exports.EmoBaseImg = EmoBaseImg;
