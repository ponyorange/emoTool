const getLoopImgs = async (req, res, next) => {
  let idx = req.query.idx % 3;
  let data0 = ['三连','鸽子','进击的巨人','就是这种感觉','女朋友','等等我'];
  let data1 = ['鲁迅','不讲武德','苏大强','胖虎','多啦A梦','白色小人'];
  let data2 = ['困','瑶','在吗','委屈','giao','沙雕表情'];
  let data = data0;
  if (idx === 0){
    data = data0;
  } else if(idx === 1){
    data = data1;
  }else{
    data = data2;
  }
  res.json(global.toJson(200, '来了老弟',data))
};
module.exports = getLoopImgs;
