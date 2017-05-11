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


    jQuery.support.cors = true;
    $(function () {
        var $userPhone = $('#userPhone');
        var $userPass = $('#userPass');
        var $smsCode = $('#smsCode');
        var $loginBtn = $('#loginBtn');
        var resultState = {},enPassword;
        var regex = /^1\d{10}$/;

        // $(document).on('click','#smsCodeBtn',function () {
        //    $.ajax({
        //        url:"//swagger.cqdai.cn:9090/shopwap/user/sendDynamicCode",
        //        type:"post",
        //        dataType:"json",
        //        cache:false,
        //        async:false,
        //        data:{userPhone:$userPhone.val(),codeFlag:"0"},
        //        success:function (data) {
        //            console.log(data);
        //
        //        }
        //    })
        // });

        $(document).on('click','#loginBtn',function () {
            var username = $.trim($userPhone.val());
            console.log(username);
            if( !regex.test(username  || username == '' || username == '')){
                return $.toast("用户名或密码输入有误！")
            }
            $.ajax({
                url: "//swagger.cqdai.cn:9090/shopwap/common/public_key",
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
                url: "//swagger.cqdai.cn:9090/shopwap/user/userLogin",
                type: "post",
                cache:false,
                async:false,
                dataType:"json",
                data:{username:username ,enPassword:enPassword},
                success: function(data) {
                    console.log(data);
                    if (data.authStatus == "200" && data.setAuthMsg == true){
                        $.toast(data.authMsg,2000);
                        // return location.href = "/html/my/my.html"
                    }else{
                        $.toast(data.authMsg,2000);
                        $userPhone.val("");
                        $userPass.val("")
                    }

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
