const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
// 创建用户实体
/**
 *res.json({
    theemColor: '#222',//主题颜色
    borderColor:'#ffffff',
    theemSelColor:'#E7C281',
    emoImgSelBorderColor:'#E7C281',
    sliderBg:'#f2f3f4',
    btnTextColor:'#fff',
    navigationBarColor:'#8FD5D5',
    navigationBarTextColor:'#000000',
    backgroundColorTop:'#8FD5D5',
    backgroundColorBottom:'#8FD5D5',
    emoText: "戴帽子过圣诞",
    bgPath:"/images/makeBg/bg.jpg",
  });
 */
const MakePageThemm = sequelize.define('em_makepagethemms', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  emoText: {
    type: Sequelize.STRING,
  },
  bgPath: {
    type: Sequelize.STRING,
  },
  theemColor:{
    type: Sequelize.STRING,
  },
  borderColor:{
    type: Sequelize.STRING,
  },
  theemSelColor:{
    type: Sequelize.STRING,
  },
  emoImgSelBorderColor:{
    type: Sequelize.STRING,
  },
  sliderBg:{
    type: Sequelize.STRING,
  },
  btnTextColor:{
    type: Sequelize.STRING,
  },
  navigationBarColor:{
    type: Sequelize.STRING,
  },
  backgroundColorTop:{
    type: Sequelize.STRING,
  },
  backgroundColorBottom:{
    type: Sequelize.STRING,
  },
  navigationBarTextColor:{
    type: Sequelize.STRING,
  },
  status:{//状态：1使用中，0待使用
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});
/** 插入数据 */
MakePageThemm.insertData = async (themm) => {
  await MakePageThemm.sync({force: false});
  // 表已创建
  return MakePageThemm.create({
    theemColor: themm.theemColor,//主题颜色
    borderColor:themm.borderColor,
    theemSelColor:themm.theemSelColor,
    emoImgSelBorderColor:themm.emoImgSelBorderColor,
    sliderBg:themm.sliderBg,
    btnTextColor:themm.btnTextColor,
    navigationBarColor:themm.navigationBarColor,
    navigationBarTextColor:themm.navigationBarTextColor,
    backgroundColorTop:themm.backgroundColorTop,
    backgroundColorBottom:themm.backgroundColorBottom,
    emoText: themm.emoText,
    bgPath:themm.bgPath,
    status:themm.status
  })
};
MakePageThemm.updateData = async (themm) => {
  return MakePageThemm.update({
    theemColor: themm.theemColor,//主题颜色
    borderColor:themm.borderColor,
    theemSelColor:themm.theemSelColor,
    emoImgSelBorderColor:themm.emoImgSelBorderColor,
    sliderBg:themm.sliderBg,
    btnTextColor:themm.btnTextColor,
    navigationBarColor:themm.navigationBarColor,
    navigationBarTextColor:themm.navigationBarTextColor,
    backgroundColorTop:themm.backgroundColorTop,
    backgroundColorBottom:themm.backgroundColorBottom,
    emoText: themm.emoText,
    bgPath:themm.bgPath,
    status:themm.status
  }, {
    where: {id:themm.id}
  })
};
/** 查找所有类型**/
MakePageThemm.findAllTHeme = async () => {
  return MakePageThemm.findAll();
};

/** 根据status查找所有类型**/
MakePageThemm.findByStatus = async (status) => {
  return MakePageThemm.findAll({where:{status}});
};

/** 根据ID查找类型**/
MakePageThemm.findById = async (id) => {
  return MakePageThemm.findAll({where:{id}});
};

module.exports.MakePageThemm = MakePageThemm;
