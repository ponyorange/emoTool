const {RecommendSendUsers} = require('@/mysql/admin/recommendSendUsers') ;// 引入数据库文件

const addLoopImgs = async (req, res, next) => {
  // console.log(req.body);
  let data = req.body;
  // if (data.formid.length !== 32){
  //   res.json(global.toJson(300, '非法formid'))
  // } else{
  //   const endData = await RecommendSendUsers.insertData(data.openid, data.formid,data.userid);
  //   if (endData){
  //     res.json(global.toJson(200, '订阅成功'))
  //   } else{
  //     res.json(global.toJson(500, '未知错误'))
  //   }
  // }
    const endData = await RecommendSendUsers.insertData(data.openid, data.formid,data.userid);
    if (endData){
      res.json(global.toJson(200, '订阅成功'))
    } else{
      res.json(global.toJson(500, '未知错误'))
    }
};
module.exports = addLoopImgs;

