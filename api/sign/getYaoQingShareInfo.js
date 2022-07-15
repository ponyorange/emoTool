const updateWXInfo = async (req, res, next) => {
  let title = "表情包，有我就够了！抖音、热门、套路表情包";
  let imgUrl = "https://orange.seeyouweb.com/images/appIcon/shareImg.jpg";
  res.json(global.toJson(200, '获取成功',{title,imgUrl}))
};
module.exports = updateWXInfo;

