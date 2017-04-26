"use strict";

define(function (require, exports, module) {
    require('jquery');
    require('light7');
    require('swiper');
    require('rsa');
    require('base64');
    require('jsbn');
    require('prng4');
    require('rng');
    require('jsonp');

    jQuery.support.cors = true;
    $(function () {
        var $userPhone = $('#userPhone');
        var $userPass = $('#userPass');
        var $loginBtn = $('#loginBtn');
        var resultState = {},enPassword;
        var regex = /^1\d{10}$/;


        $(document).on('click','#loginBtn',function () {
            if( !regex.test($userPhone.val()  || $userPhone.val() == '' || $userPass.val() == '')){
                return $.toast("用户名或密码输入有误！")

            }
            $.ajax({
                url: "//192.168.88.75:8080/shopwap/common/public_key",
                type: "get",
                cache:false,
                async:false,
                dataType:"json",
                success: function(data) {
                    var rsaKey = new RSAKey();
                    rsaKey.setPublic(b64tohex(data.modulus), b64tohex(data.exponent));
                    enPassword = hex2b64(rsaKey.encrypt($userPass.val()));
                }
            });
            $.ajax({
                url: "/user/userLogin",
                type: "post",
                cache:false,
                async:false,
                dataType:"json",
                data:{username:$userPhone.val(),enPassword:enPassword},
                success: function(data) {
                    $.toast("用户登录成功!");
                }
            });

        });
    });

    // loginPage
    require.async('handlebars', function () {
        var data = {};
        var tpl = require('/layout/my/login.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#loginPage").html(html);
    });

});
