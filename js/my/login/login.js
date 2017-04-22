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


    $(function () {
        var $userPhone = $('#userPhone');
        var $userPass = $('#userPass');
        var $loginBtn = $('#loginBtn');
        var resultState = {};
        var regex = /^1\d{10}$/;

        function getRSAKey(){

        }



        $(document).on('click','#loginBtn',function () {
            $.ajax({
                url: "//192.168.88.75:8080/shopwap/common/public_key",
                type: "get",
                dataType: "json",
                cache: false,
                // error:function (data) {
                //     console.log("error")
                // },
                success: function(data) {
                    var rsaKey = new RSAKey();
                    rsaKey.setPublic(b64tohex(data.modulus), b64tohex(data.exponent));
                    var enPassword = hex2b64(rsaKey.encrypt($userPass.val()));
                    console.log(enPassword)
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
