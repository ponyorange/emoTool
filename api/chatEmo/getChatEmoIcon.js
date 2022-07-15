const getLoopImgs = async (req, res, next) => {
  let iconPath = "/images/baseImg/chatEmoIcon.gif";
  let status = 1;//1为开启机器人聊天入口
  res.json(global.toJson(200, '获取成功',{iconPath,status}))
};
module.exports = getLoopImgs;
