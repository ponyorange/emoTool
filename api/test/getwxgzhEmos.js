// var cheerio = require('cheerio');
var request = require('request');

const getLoopImgs = async (req, res, next) => {
  // let data = {a:'123'};
  // let forms= new FormData();
  // forms.append('title','testsdsd');
  let keyword = req.query.keyword;
  let currentPage = req.query.currentPage;
  console.log(keyword);
  request({
    url:    'http://123.207.240.254:3000/index',   // 请求的URL
    method: 'GET',
    qs:{
      keyword:keyword,
      currentPage:currentPage
    }// 请求方法
  }, function (error, response, body) {
    // console.log(error);
    // console.log(body); // 输出网页内容
    // console.log(response);
    if (!error && response.statusCode === 200) {
      // console.log(body); // 输出网页内容
      res.json(global.toJson(200, '获取成功',body))
      // console.log(response);
    }
  });
};
module.exports = getLoopImgs;
