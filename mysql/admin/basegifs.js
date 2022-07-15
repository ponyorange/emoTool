const {sequelize} = require('../utils');
const Sequelize = require('sequelize');
// 创建用户实体
const Basegifs = sequelize.define('em_basegifs', {
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
  demo:{//例子图片
    type: Sequelize.STRING,
  },
  textinfo:{//文字信息
    type: Sequelize.TEXT
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
  status:{//状态：0发布，1删除
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});

/** 插入数据 */
Basegifs.insertData = async (path, textinfo,from,title,des,cover,demo) => {
  await Basegifs.sync({force: false});
  // 表已创建
  return Basegifs.create({
    path,
    textinfo,
    from,
    title,
    des,
    cover,
    demo
  })
};
Basegifs.updateData = async (id,path, textinfo,from,title,des,cover,demo) => {
  return Basegifs.update({
    path, textinfo,from,title,des,cover,demo
  }, {
    where: {id}
  })
};


/** 获取制作表情首页基本图片 */
Basegifs.findAllImgs = async () => {
  let status = 0;
  return Basegifs.findAll({order: [['id', 'DESC']],where: {status}})
};

/** 根据类型获取 */
Basegifs.findById = async (id) => {
  let status = 0;
  return Basegifs.findAll({where: {status,id}})
};

/** 修改数据 */
Basegifs.updateMakeBaseImgs = async  (img)=> {
  if (img.id){
    return Basegifs.update(img, {
      where: {id:img.id}
    })
  } else{
    return Basegifs.create({
      path:img.path,
      type:0,
      position:img.position,
    })
  }
};

/** 删除 */
Basegifs.deleteImg = async  (imgId)=> {
  return Basegifs.destroy(
    {
      where: {id:imgId}
    })
};

module.exports.Basegifs = Basegifs;
