"use strict";

define(function (require, exports, module) {
    require('jquery');
    require('light7');
    require('siteUrl');
    require('store');
    require('rsa-all');



    jQuery.support.cors = true;
    $(function () {
        var $userPhone = $('#userPhone');
        var $userPass = $('#userPass');
        var resultState = {},
            enPassword;
        var regex = /^1\d{10}$/;

        $(document).on('click','#loginBtn',function () {

            var username = $.trim($('#userPhone').val());
            if( !regex.test(username  || username == '' || username == '')){
                return $.toast("用户名或密码输入有误！")
            }
            $.ajax({
                url: BASE_URL+USER_SITE_URL.PUBLIC_KEY.URL,
                type: USER_SITE_URL.PUBLIC_KEY.METHOD,
                dataType:USER_SITE_URL.DATATYPE,
                cache:true,
                async:false,
                success: function(data) {
                    var rsaKey = new RSAKey();
                    rsaKey.setPublic(b64tohex(data.modulus), b64tohex(data.exponent));
                    enPassword = hex2b64(rsaKey.encrypt($('#userPass').val()));
                }
            });



            $.ajax({
                url: BASE_URL+USER_SITE_URL.USER_LOGIN.URL,
                type: USER_SITE_URL.USER_LOGIN.METHOD,
                cache:true,
                async:false,
                dataType:USER_SITE_URL.DATATYPE,
                data:{
                    username:username ,
                    enPassword:enPassword
                },
                timeout:3000,
                success: function(data,textStatus, jqXHR) {
                    if (data.authStatus == "200" ){
                        store.set("username",username);
                        store.set("userStatus",true);
                        $.toast(data.authMsg+" 3 秒后自动跳转",3000);
                        setTimeout(function(){
                            location.href = "/m/html/index.html"
                        },3000);
                    }else{
                        $.toast(data.authMsg);
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
        var tpl = require('/m/layout/my/login.tpl');
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#loginPage").html(html);
    });

});
