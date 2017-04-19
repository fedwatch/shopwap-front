/**
 * Created by Administrator on 2017/3/10.
 * @module
 *
 */
define(function(require,exports,module){
    require('jquery');
    require('swiper');
    require('moclight7kjs');

    $(function () {
        var $userPhone = $("#userPhone");//手机号
        // var $userPass = $("#userPass");//登录密码
        var $getSMSCodeBtn = $("#getSMSCodeBtn");//获取验证码按钮
        var $userPassError = $("#userPassError");//登录密码错误提示信息
        var $userPhoneError = $("#userPhoneError");//手机号错误提示信息
        var $userSMSCodeError = $("#userSMSCodeError");//验证码错误提示信息
        var $smsCode = $("#smsCode");//SMS验证码
        var $registerBtn = $('#registerBtn');//立即注册按钮
        var registerResult = {};//内部数据的状态集


        function checkRegisterBtn() {

        }
    });

    // modifySuccess
    require.async('handlebars',function(){
        var data = {};
        var tpl = require('/layout/my/forgetPassword/modifySuccess.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#modifySuccessPage").html(html);
    });



});
