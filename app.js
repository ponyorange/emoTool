require('./config/alias'); // 引用别名
const toJson = require('./config/apiJson');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入jwt token工具
const JwtUtil = require('@/utils/jwt');
const fs = require('fs');
const http = require('http');
const https = require('https');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var adminRouter = require('./routes/admin');
var utilsRouter = require('./routes/utils');
var makeEmoRouter = require('./routes/makeEmo');
var wantRouter = require('./routes/want');
var testRouter = require('./routes/test');
var gifRoomRouter = require('./routes/gifRoom');
var emohouseRouter = require('./routes/emohouse');

var app = express();
global.toJson = toJson;

//https
//根据项目的路径导入生成的证书文件
var privateKey  = fs.readFileSync(path.join(__dirname, '/creadit/2_orange.seeyouweb.com.key'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, '/creadit/1_orange.seeyouweb.com_bundle.crt'), 'utf8');
var credentials = {key: privateKey, cert: certificate};
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//token验证
app.use(function (req, res, next) {
  // console.log("-----------123-----------");
  console.log(req.url);
  // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验
  if (req.url !== '/api/users/login' && req.url !== '/api/admin/login' && req.url !== '/static' && req.url !== '/api/test/getwxgzhEmos') {
    let token = req.headers.token;
    let jwt = new JwtUtil(token);
    let result = jwt.verifyToken();
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result === 'err') {
      // console.log(result);
      res.send({code: 403, msg: '登录已过期,请重新登录'});
      // res.render('login.html');
    } else {
      next();
    }
  } else {
    next();
  }
});

//路由
const api = '/api';
app.use(api + '/', indexRouter);
app.use(api + '/users', usersRouter);
app.use(api + '/home', homeRouter);
app.use(api + '/admin', adminRouter);
app.use(api + '/utils', utilsRouter);
app.use(api + '/makeEmo', makeEmoRouter);
app.use(api + '/want', wantRouter);
app.use(api + '/test', testRouter);
app.use(api + '/gifRoom', gifRoomRouter);
app.use(api + '/emohouse', emohouseRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  console.log("-----------123-----------");
  console.log(req.url);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//可以分别设置http、https的访问端口号
var PORT = 3000;
// var SSLPORT = 443;
// var SSLPORT = 1314;
//创建http服务器
httpServer.listen(PORT, function() {
  console.log('HTTP Server is running on: http://localhost:%s', PORT);
});

//创建https服务器
// httpsServer.listen(SSLPORT, function() {
//   console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
// });
module.exports = app;
