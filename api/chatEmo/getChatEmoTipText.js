const getLoopImgs = async (req, res, next) => {
  let text = "主人，你可以：\n1.输入*+文字快速获得表情，例如：*没钱肯定不行\n2.尝试给我发图片，我会与你斗图哦～\n3.输入：笑话，我给你讲笑话";
  res.json(global.toJson(200, '获取成功',text))
};
module.exports = getLoopImgs;
