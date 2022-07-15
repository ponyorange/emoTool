const {MakePageThemm} = require('@/mysql/miniprogram/makePageThemm') ;// 引入数据库文件

const changeMakeThemm = async (req, res, next) => {
  let themeId = req.body.banner.id;
  //第一步：把使用的变为不使用
  let currentThemeArr = await MakePageThemm.findByStatus(1);
  let currentTheme = currentThemeArr[0];
  currentTheme.status = 0;
  let updateData = await MakePageThemm.updateData(currentTheme);
  //第二步，把传来的变为使用
  if (updateData){
    let data = await MakePageThemm.findById(themeId);
    if (data){
      let newTheme = data[0];
      newTheme.status = 1;
      await MakePageThemm.updateData(newTheme);
      res.json(global.toJson(200, '修改成功',data))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
  } else{
    res.json(global.toJson(500, '未知错误'))
  }
};
module.exports = changeMakeThemm;
