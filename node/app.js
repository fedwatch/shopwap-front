// 程序入口
// https://cnodejs.org/topic/54e96cf7ddce2d471403203f
// superagent，模拟登录，触发页面
// nodemailer，发送邮件
// later，定时执行任务
// *async，排队完成任务（可选，某些任务有先后顺序）
// *phantomJS，网页截图（可选）
var accounts = require('./config').accounts;
var task = require('./controller/task');
var autoCheckIn = require('./controller/autoCheckIn');

// 定时执行
task({h: [18], m: [0]}, function () {
    accounts.forEach(function (v) {
        autoCheckIn(v);
    });
});

console.log('======', '自动签到服务运行中..', '======');